import { SupabaseClient } from "@supabase/supabase-js";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { getUserLoggedIn } from "./auth";
import {
  UserListEntity,
  UserListInsert,
  UserListUpdate,
  UserListPositionEntity,
  UserListPositionInsert,
  UserListStackEntity,
} from "@/types/type";
import {
  PositionInput,
  PositionWithStacks,
  ProfilePostError,
  ProfileUpdateError,
  UserInfo,
} from "@/types/user";

const resolveClient = (client?: SupabaseClient): SupabaseClient =>
  client ?? createBrowserClient();

/**
 * 온보드 데이터 전송 API
 * 유저 프로필 → 포지션 → 스택 순서로 생성합니다.
 * @returns 생성된 유저 전체 정보 (포지션/스택 포함)
 */
export const postUserInfoOnboard = async (
  userProfile: UserListInsert,
  userPositions: PositionInput[],
  client?: SupabaseClient,
): Promise<UserInfo | undefined> => {
  const supabase = resolveClient(client);

  const userList = await _postUserProfile(supabase, userProfile);

  if (typeof userList === "string") {
    console.error(`온보딩 전송 중단. 에러명: ${userList}`);
    return;
  }
  if (!userList) return;

  const positionArr: PositionWithStacks[] = [];

  await Promise.all(
    userPositions.map(async (positionInput) => {
      const userPosition = await _postUserPositions(
        supabase,
        {
          position: positionInput.position,
          created_at: new Date().toISOString(),
        },
        userList.id,
      );
      if (!userPosition) return;

      const userStack = await _postUserStacks(
        supabase,
        {
          stacks: positionInput.stacks,
          created_at: new Date().toISOString(),
        },
        userPosition.id,
      );
      if (!userStack) return;

      positionArr.push({
        id: userPosition.id,
        position: userPosition.position ?? null,
        stacks: userStack.stacks ?? [],
      });
    }),
  );

  return { ...userList, positions: positionArr };
};

// 유저 프로필 POST
const _postUserProfile = async (
  supabase: SupabaseClient,
  insertObject: UserListInsert,
): Promise<UserListEntity | ProfilePostError | null> => {
  const { data, error } = await supabase
    .from("user_list")
    .insert([insertObject])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      if (error.message.includes("user_id")) {
        console.error(
          "이미 생성된 온보드 정보가 있습니다. 마이페이지에서 정보를 수정해주세요.",
        );
        return "user_id_error";
      }
      if (error.message.includes("name")) {
        console.error("중복된 닉네임이 있습니다.");
        return "name_error";
      }
    }
    console.error("오류 발생", error);
    return "other_error";
  }

  return data ?? null;
};

// 유저 포지션 POST
const _postUserPositions = async (
  supabase: SupabaseClient,
  insertObject: UserListPositionInsert,
  profile_id: number,
): Promise<UserListPositionEntity | null> => {
  const { data, error } = await supabase
    .from("user_list_positions")
    .insert([{ ...insertObject, profile_id }])
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

// 유저 스택 POST
const _postUserStacks = async (
  supabase: SupabaseClient,
  insertObject: { stacks: string[]; created_at: string },
  position_id: number,
): Promise<UserListStackEntity | null> => {
  const { data, error } = await supabase
    .from("user_list_stacks")
    .insert([
      {
        stacks: insertObject.stacks,
        position_id,
        created_at: insertObject.created_at,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

/**
 * 로그인된 유저 정보 조회
 * @returns 유저 프로필 + 포지션/스택 정보
 */
export const getUserInfo = async (
  client?: SupabaseClient,
): Promise<UserInfo | null> => {
  const supabase = resolveClient(client);

  const authData = await getUserLoggedIn();
  if (!authData?.id) return null;

  const profile = await _getUserProfile(supabase, authData.id);
  if (!profile) return null;

  const rawPositions = await _getUserPositions(supabase, profile.id);
  if (!rawPositions) return null;

  const positions = await Promise.all(
    rawPositions.map(
      async (pos): Promise<PositionWithStacks> => ({
        id: pos.id,
        position: pos.position,
        stacks: await _getUserStacks(supabase, pos.id),
      }),
    ),
  );

  return { ...profile, positions };
};

/**
 * 특정 유저 정보 조회 (user_id 기반)
 * @param user_id - 조회할 유저의 auth user_id
 * @param client - 서버 컴포넌트에서 호출 시 "@/lib/supabase/server" 클라이언트를 넘길 것
 * @returns 유저 프로필 + 포지션/스택 정보
 */
export const getUserInfoToUserId = async (
  user_id: string,
  client?: SupabaseClient,
): Promise<UserInfo | null> => {
  const supabase = resolveClient(client);

  const profile = await _getUserProfile(supabase, user_id);
  if (!profile) return null;

  const rawPositions = await _getUserPositions(supabase, profile.id);
  if (!rawPositions) return null;

  const positions = await Promise.all(
    rawPositions.map(
      async (pos): Promise<PositionWithStacks> => ({
        id: pos.id,
        position: pos.position,
        stacks: await _getUserStacks(supabase, pos.id),
      }),
    ),
  );

  return { ...profile, positions };
};

// 유저 프로필 GET
const _getUserProfile = async (
  supabase: SupabaseClient,
  user_id: string,
): Promise<UserListEntity | null> => {
  const { data, error } = await supabase
    .from("user_list")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

// 유저 포지션 GET
const _getUserPositions = async (
  supabase: SupabaseClient,
  profile_id: number,
): Promise<Pick<UserListPositionEntity, "id" | "position">[] | null> => {
  const { data, error } = await supabase
    .from("user_list_positions")
    .select("id, position")
    .eq("profile_id", profile_id);

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

// 유저 스택 GET
const _getUserStacks = async (
  supabase: SupabaseClient,
  position_id: number,
): Promise<string[]> => {
  const { data, error } = await supabase
    .from("user_list_stacks")
    .select("stacks")
    .eq("position_id", position_id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return [];
  }

  return data?.stacks ?? [];
};

// ─── 마이페이지 수정 PUT API ──────────────────────────────────────────────────

/**
 * 유저 정보 수정 API
 * 포지션/스택은 기존 데이터를 삭제 후 재삽입합니다.
 * @returns 수정된 유저 전체 정보 (포지션/스택 포함)
 */
export const putUserInfo = async (
  updatingUserProfile: UserListUpdate,
  updatingUserPositions: PositionInput[],
  client?: SupabaseClient,
): Promise<UserInfo | undefined> => {
  const supabase = resolveClient(client);

  const user = await getUserLoggedIn();
  if (!user?.id) return;

  const userList = await _putUserProfile(
    supabase,
    updatingUserProfile,
    user.id,
  );

  // typeof string → 에러 코드이므로 조기 반환
  // 이후 userList는 UserListEntity로 타입 확정
  if (typeof userList === "string") {
    console.error(`유저 정보 수정 중 오류 발생: ${userList}`);
    return;
  }

  await _deleteUserPositions(supabase, userList.id);

  const positionsArr: PositionWithStacks[] = [];

  for (const positionInput of updatingUserPositions) {
    const updatedPosition = await _postUserPositions(
      supabase,
      {
        position: positionInput.position,
        created_at: new Date().toISOString(),
      },
      userList.id,
    );
    if (!updatedPosition) continue;

    const updatedStacks = await _postUserStacks(
      supabase,
      {
        stacks: positionInput.stacks,
        created_at: new Date().toISOString(),
      },
      updatedPosition.id,
    );
    if (!updatedStacks) continue;

    positionsArr.push({
      id: updatedPosition.id,
      position: updatedPosition.position ?? null,
      stacks: updatedStacks.stacks ?? [],
    });
  }

  return { ...userList, positions: positionsArr };
};

// 유저 프로필 PUT
const _putUserProfile = async (
  supabase: SupabaseClient,
  updateObject: UserListUpdate,
  user_id: string,
): Promise<UserListEntity | ProfileUpdateError> => {
  const { data, error } = await supabase
    .from("user_list")
    .update(updateObject)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505" && error.details?.includes("name")) {
      console.error("닉네임 중복 오류");
      return "name_error";
    }
    console.error("오류 발생", error);
    return "other_error";
  }

  if (!data) return "other_error";
  return data;
};

// 유저 포지션 DELETE
const _deleteUserPositions = async (
  supabase: SupabaseClient,
  profile_id: number,
): Promise<void> => {
  const { error } = await supabase
    .from("user_list_positions")
    .delete()
    .eq("profile_id", profile_id);

  if (error) {
    console.error("포지션 삭제 오류", error);
  }
};

/**
 * 닉네임 중복 여부 확인
 * @returns true면 중복, false면 사용 가능
 */
export const checkDuplicateNickname = async (
  nickname: string,
  client?: SupabaseClient,
): Promise<boolean> => {
  const supabase = resolveClient(client);

  const { data, error } = await supabase.rpc("check_username_duplicate", {
    user_name: nickname,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return data as boolean;
};

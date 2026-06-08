import { createClient } from "@/lib/supabase/client";
import { getPostDetails } from "./post";
import {
  ApplicantProfile,
  ApplicationListItem,
  PostApplicationResult,
  SelectedPositions,
} from "@/types/apply";
import { PostApplyEntity, PostApplyInsert } from "@/types/type";

const supabase = createClient();

/**
 * 게시물 신청 API
 */
export const postApplication = async (
  postId: number,
  selectedPositions: SelectedPositions,
): Promise<PostApplicationResult | undefined> => {
  try {
    // 게시물 조회
    const postDetails = await getPostDetails(postId);

    if (!postDetails) {
      console.error("게시물 정보를 가져올 수 없습니다.");
      return;
    }

    // 로그인 유저 조회
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("사용자 정보 가져오기 실패:", userError?.message);
      return;
    }

    // 중복 신청 여부 확인
    const { data: existingApplication, error: fetchError } = await supabase
      .from("post_apply_list")
      .select()
      .eq("proposer_id", user.id)
      .eq("post_id", postId)
      .maybeSingle();

    if (fetchError) {
      console.error("신청 확인 중 오류 발생:", fetchError.message);
      return;
    }

    if (existingApplication) {
      console.error("이미 신청한 게시물입니다.");
      return;
    }

    // 유저 프로필 조회
    const { data: userList, error: profileError } = await supabase
      .from("user_list")
      .select("name, profile_img_path")
      .eq("user_id", user.id)
      .single<ApplicantProfile>();

    if (profileError) {
      console.error("유저 프로필 조회 실패:", profileError.message);
      return;
    }

    const proposerName = userList?.name ?? "이름 없음";
    const proposerImgPath = userList?.profile_img_path ?? "";

    // insert 데이터 생성
    const insertData: PostApplyInsert = {
      host_id:
        typeof postDetails.author === "string"
          ? postDetails.author
          : postDetails.author,
      proposer_id: user.id,
      post_id: postId,
      proposer_name: proposerName,
      proposer_img_path: proposerImgPath,
      post_title: postDetails.title,
      accepted: false,
      finished: false,
      proposer_positions: selectedPositions,
    };

    // 신청 생성
    const { data, error } = await supabase
      .from("post_apply_list")
      .insert([insertData])
      .select();

    if (error) {
      console.error("신청 생성 실패:", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error("신청 처리 중 오류 발생:", error);
  }
};

/**
 * 신청 취소 API
 */
export const deleteApplication = async (
  postId: number,
): Promise<PostApplyEntity[] | null | undefined> => {
  try {
    // 로그인 유저 조회
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("사용자 정보 가져오기 실패:", userError?.message);
      return;
    }

    // 신청 삭제
    const { data, error } = await supabase
      .from("post_apply_list")
      .delete()
      .eq("proposer_id", user.id)
      .eq("post_id", postId)
      .select();

    if (error) {
      console.error("신청 취소 실패:", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error("신청 취소 처리 중 오류 발생:", error);
  }
};

/**
 * 내가 작성한 게시물의 신청 목록 조회
 */
export const getApplicationsForMyPosts = async (
  postId: number,
): Promise<ApplicationListItem[] | undefined> => {
  try {
    // 로그인 유저 조회
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("사용자 정보 가져오기 실패:", userError?.message);
      return;
    }

    const { data, error } = await supabase
      .from("post_apply_list")
      .select(
        `
          created_at,
          proposer_name,
          proposer_id,
          proposer_positions,
          proposer_img_path,
          post_id,
          post_title,
          accepted,
          finished
        `,
      )
      .eq("host_id", user.id)
      .eq("post_id", postId);

    if (error) {
      console.error(
        "내가 작성한 글에 대한 신청 목록 가져오기 실패:",
        error.message,
      );
      return;
    }

    return data;
  } catch (error) {
    console.error("내가 작성한 글에 대한 신청 목록 처리 중 오류 발생:", error);
  }
};

/**
 * 현재 로그인 유저가 해당 게시물에 신청했는지 확인
 */
export const checkAlreadyApplied = async (postId: number): Promise<boolean> => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return false;
    }

    const { data, error } = await supabase
      .from("post_apply_list")
      .select("id")
      .eq("proposer_id", user.id)
      .eq("post_id", postId)
      .maybeSingle();

    if (error) {
      console.error(error.message);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

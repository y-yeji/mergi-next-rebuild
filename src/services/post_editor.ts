import { createClient } from "@/lib/supabase/client";
import { getUserLoggedIn } from "./auth";
import { PostEntity, PostInsert, PostUpdate } from "@/types/type";
import { PostEditorResult } from "@/types/post";

const supabase = createClient();

/**
 * 게시물 작성 API (로그인 필요)
 * @param requestObj - 게시물 기본 정보 (author 제외)
 * @param positions - 포지션 목록
 * @param techStacks - 기술스택 목록
 */
export const postCreatePost = async (
  requestObj: Omit<PostInsert, "author">,
  positions: string[],
  techStacks: string[],
): Promise<PostEditorResult | undefined> => {
  try {
    const user = await getUserLoggedIn();
    if (!user) throw new Error("로그인이 필요합니다!");

    const { data, error } = await supabase
      .from("post")
      .insert({ ...requestObj, author: user.id })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    const postId = data.id;
    const joinedPositions = positions.join("/");
    const joinedTechStacks = techStacks.join("/");

    const [positionResult, techStackResult] = await Promise.all([
      _postAddPosition(postId, joinedPositions),
      _postAddTechStack(postId, joinedTechStacks),
    ]);

    return {
      data,
      positions: positionResult ?? [],
      techStacks: techStackResult ?? [],
    };
  } catch (error) {
    console.error(error);
  }
};

// 게시글 포지션 추가
const _postAddPosition = async (
  postId: number,
  positions: string,
): Promise<string[] | undefined> => {
  try {
    const { data, error } = await supabase
      .from("post_positions")
      .insert([{ post_id: postId, position: positions }])
      .select("position")
      .single();

    if (error) throw new Error(error.message);

    return data.position?.split("/") ?? [];
  } catch (error) {
    console.error(error);
  }
};

// 게시글 기술스택 추가
const _postAddTechStack = async (
  postId: number,
  stacks: string,
): Promise<string[] | undefined> => {
  try {
    const { data, error } = await supabase
      .from("post_stacks")
      .insert([{ post_id: postId, stack: stacks }])
      .select("stack")
      .single();

    if (error) throw new Error(error.message);

    return data.stack?.split("/") ?? [];
  } catch (error) {
    console.error(error);
  }
};

/**
 * 게시물 이미지 업로드 API (로그인 필요)
 * 반환된 publicUrl을 게시물 생성 API의 post_img_path에 넣어야 합니다.
 * @param file - 업로드할 이미지 파일 (event.target.files[0])
 * @returns 업로드된 이미지의 public URL
 */
export const postUploadPostImage = async (
  file: File,
): Promise<string | undefined> => {
  try {
    const user = await getUserLoggedIn();
    if (!user) throw new Error("로그인이 필요합니다!");

    const encodedFileName = encodeURIComponent(file.name).replace(/%/g, "");

    // 동일한 파일명이 없을 때만 업로드
    const { data: existFiles } = await supabase.storage
      .from("post_images")
      .list("");

    const isDuplicate = existFiles?.some((f) => f.name === encodedFileName);

    if (!isDuplicate) {
      const { error } = await supabase.storage
        .from("post_images")
        .upload(encodedFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw new Error(error.message);
    }

    const { data: publicURL } = supabase.storage
      .from("post_images")
      .getPublicUrl(encodedFileName);

    return publicURL.publicUrl;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 내가 작성한 게시물 수정 API (로그인 필요)
 * @param requestObj - 수정할 게시물 정보
 * @param positions - 수정할 포지션 목록
 * @param stacks - 수정할 기술스택 목록
 * @param postId - 수정할 게시물 id
 */
export const putUpdatePost = async (
  requestObj: PostUpdate,
  positions: string[],
  stacks: string[],
  postId: number,
): Promise<PostEditorResult | undefined> => {
  try {
    const user = await getUserLoggedIn();
    if (!user) throw new Error("로그인이 필요합니다!");

    const { data, error } = await supabase
      .from("post")
      .update(requestObj)
      .eq("id", postId)
      .eq("author", user.id) // 자신이 작성한 글인지 확인
      .select()
      .single();

    if (error) throw new Error(error.message);

    const joinedPositions = positions.join("/");
    const joinedStacks = stacks.join("/");

    const [positionResult, techStackResult] = await Promise.all([
      _putUpdatePosition(postId, joinedPositions),
      _putUpdateTechStack(postId, joinedStacks),
    ]);

    return {
      data,
      positions: positionResult ?? [],
      techStacks: techStackResult ?? [],
    };
  } catch (error) {
    console.error(error);
  }
};

// 게시글 포지션 수정
const _putUpdatePosition = async (
  postId: number,
  positions: string,
): Promise<string[] | undefined> => {
  const { data, error } = await supabase
    .from("post_positions")
    .update({ position: positions })
    .eq("post_id", postId)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data.position?.split("/") ?? [];
};

// 게시글 기술스택 수정
const _putUpdateTechStack = async (
  postId: number,
  stacks: string,
): Promise<string[] | undefined> => {
  const { data, error } = await supabase
    .from("post_stacks")
    .update({ stack: stacks })
    .eq("post_id", postId)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data.stack?.split("/") ?? [];
};

/**
 * 내가 작성한 게시물 삭제 API (로그인 필요)
 * @param postId - 삭제할 게시물 id
 */
export const deletePost = async (postId: number): Promise<void> => {
  try {
    const { error } = await supabase.from("post").delete().eq("id", postId);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 현재 로그인 유저가 해당 게시물의 작성자인지 확인
 * @param post_id - 확인할 게시물 id
 * @returns true면 작성자, false면 아님
 */
export const isUserPostAuthor = async (
  post_id: number,
): Promise<boolean | undefined> => {
  const { data, error } = await supabase.rpc("is_user_post_author", {
    post_id,
  });

  if (error) {
    console.error(error);
    return;
  }

  return data as boolean;
};

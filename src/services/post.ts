import { SupabaseClient } from "@supabase/supabase-js";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { getPostComments } from "./comments";
import {
  PostDetails,
  PostFilters,
  PostPaginationResult,
  PostRpcRow,
} from "@/types/post";

const resolveClient = (client?: SupabaseClient): SupabaseClient =>
  client ?? createBrowserClient();

/**
 * 전체 게시물 목록 조회
 * @param filters - 필터 조건
 * @param size - 가져올 게시물 수 (기본값: 10)
 */
export const getAllPosts = async (
  filters: PostFilters,
  size: number = 10,
  client?: SupabaseClient,
): Promise<PostRpcRow[] | null> => {
  const supabase = resolveClient(client);

  try {
    const { data, error } = await supabase.rpc("get_all_posts", {
      filters,
      size,
    });

    if (error) {
      console.error(error);
      return null;
    }

    return data as PostRpcRow[];
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 페이지네이션이 적용된 전체 게시물 목록 조회
 * @param filters - 필터 조건
 * @param page - 페이지 번호 (기본값: 1)
 * @param page_size - 페이지당 게시물 수 (기본값: 12)
 */
export const getAllPostsWithPagination = async (
  filters: PostFilters,
  page: number = 1,
  page_size: number = 12,
  client?: SupabaseClient,
): Promise<PostPaginationResult> => {
  const supabase = resolveClient(client);

  try {
    const { data, error } = await supabase.rpc(
      "get_filtered_posts_with_pagination",
      { filters, page, page_size },
    );

    if (error) {
      console.error(error);
      return { posts: [], total_post: 0, page, total_page: 0 };
    }

    return data as PostPaginationResult;
  } catch (error) {
    console.error(error);
    return { posts: [], total_post: 0, page, total_page: 0 };
  }
};

/**
 * 내가 신청한 게시물 목록 조회
 * @param filters - 필터 조건
 * @param page - 페이지 번호 (기본값: 1)
 * @param page_size - 페이지당 게시물 수 (기본값: 4)
 */
export const getMyApplyPosts = async (
  filters: PostFilters,
  page: number = 1,
  page_size: number = 4,
  client?: SupabaseClient,
): Promise<PostPaginationResult | null> => {
  const supabase = resolveClient(client);

  try {
    const { data, error } = await supabase.rpc("get_my_apply_posts", {
      filters,
      page,
      page_size,
    });

    if (error) {
      console.error(error);
      return null;
    }

    return data as PostPaginationResult;
  } catch (error) {
    console.error("내가 신청한 목록 처리 중 오류 발생:", error);
    return null;
  }
};

/**
 * 내가 북마크한 게시물 목록 조회
 * @param filters - 필터 조건
 * @param page - 페이지 번호
 * @param page_size - 페이지당 게시물 수
 */
export const getBookmarkPostsByUser = async (
  filters: PostFilters,
  page: number,
  page_size: number,
  client?: SupabaseClient,
): Promise<PostPaginationResult | null> => {
  const supabase = resolveClient(client);

  const { data, error } = await supabase.rpc(
    "get_user_bookmarks_with_pagination",
    { filters, page, page_size },
  );

  if (error) {
    console.error(error);
    return null;
  }

  return data as PostPaginationResult;
};

/**
 * 특정 유저가 작성한 게시물 목록 조회
 * @param user_id - 조회할 유저의 auth user_id
 * @param filters - 필터 조건
 * @param page - 페이지 번호
 * @param page_size - 페이지당 게시물 수
 */
export const getPostsByUser = async (
  user_id: string,
  filters: PostFilters,
  page: number,
  page_size: number,
  client?: SupabaseClient,
): Promise<PostPaginationResult | null> => {
  const supabase = resolveClient(client);

  const { data, error } = await supabase.rpc(
    "get_post_by_user_with_pagination",
    { filters, page, page_size, user_id },
  );

  if (error) {
    console.error(error);
    return null;
  }

  return data as PostPaginationResult;
};

/**
 * 게시물 상세 조회
 * 게시물 기본 정보 + 포지션 + 기술스택 + 댓글 + 작성자 정보를 함께 반환합니다.
 * @param postId - 조회할 게시물 id
 */
export const getPostDetails = async (
  postId: number,
  client?: SupabaseClient,
): Promise<PostDetails | null> => {
  const supabase = resolveClient(client);

  try {
    const { data: post, error: postError } = await supabase
      .from("post")
      .select()
      .eq("id", postId)
      .single();

    if (postError || !post) {
      console.error(postError);
      return null;
    }

    const [position, techStack, comments] = await Promise.all([
      getPostPositions(postId, supabase),
      getPostTechStacks(postId, supabase),
      getPostComments(postId),
    ]);

    const { data: user, error: userError } = await supabase
      .from("user_list")
      .select()
      .eq("user_id", post.author)
      .single();

    if (userError || !user) {
      console.error(userError);
      return null;
    }

    return { ...post, position, techStack, comments, user };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 특정 게시물의 포지션 목록 조회
 * @param postId - 조회할 게시물 id
 */
export const getPostPositions = async (
  postId: number,
  client?: SupabaseClient,
): Promise<string[]> => {
  const supabase = resolveClient(client);

  const { data, error } = await supabase
    .from("post_positions")
    .select("position")
    .eq("post_id", postId)
    .single();

  if (error || !data?.position) {
    console.error(error);
    return [];
  }

  return data.position.split("/");
};

/**
 * 특정 게시물의 기술스택 목록 조회
 * @param postId - 조회할 게시물 id
 */
export const getPostTechStacks = async (
  postId: number,
  client?: SupabaseClient,
): Promise<string[]> => {
  const supabase = resolveClient(client);

  const { data, error } = await supabase
    .from("post_stacks")
    .select("stack")
    .eq("post_id", postId)
    .single();

  if (error || !data?.stack) {
    console.error(error);
    return [];
  }

  return data.stack.split("/");
};

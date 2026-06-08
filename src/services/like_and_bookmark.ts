import { createClient } from "@/lib/supabase";
import {
  ToggleBookmarkResult,
  ToggleLikeResult,
  UserPostLike,
} from "@/types/like_and_bookmark";

const supabase = createClient();

/**
 * 게시물 좋아요 토글
 * @param postId 게시물 id
 * @returns 좋아요 상태
 */
export const toggleLike = async (postId: number): Promise<ToggleLikeResult> => {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    input_post_id: postId,
  });

  if (error) {
    console.error("좋아요 토글 오류:", error);
    return null;
  }

  return data;
};

/**
 * 현재 로그인한 유저의 좋아요 게시물 조회
 * @returns 좋아요한 게시물 배열
 */
export const getUserPostLikes = async (): Promise<UserPostLike[]> => {
  const { data, error } = await supabase.rpc("get_user_post_likes");

  if (error) {
    console.error("좋아요 목록 조회 오류:", error);
    return [];
  }

  return data ?? [];
};

/**
 * 게시물 북마크 토글
 * @param postId 게시물 id
 * @returns 북마크 상태
 */
export const toggleBookmark = async (
  postId: number,
): Promise<ToggleBookmarkResult> => {
  const { data, error } = await supabase.rpc("toggle_bookmark", {
    post_id: postId,
  });

  if (error) {
    console.error("북마크 토글 오류:", error);
    return null;
  }

  return data;
};

/**
 * 특정 게시물 좋아요 개수 조회
 * @param postId 게시물 id
 * @returns 좋아요 개수
 */
export const getLikeCount = async (postId: number): Promise<number> => {
  const { count, error } = await supabase
    .from("post_like")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("post_id", postId);

  if (error) {
    console.error("좋아요 개수 조회 오류:", error);
    return 0;
  }

  return count ?? 0;
};

/**
 * 특정 게시물 북마크 여부 확인
 * @param postId 게시물 id
 * @returns 북마크 여부
 */
export const checkBookmarkedPost = async (postId: number): Promise<boolean> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("post_bookmark")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("북마크 여부 조회 오류:", error);
    return false;
  }

  return !!data;
};

/**
 * 특정 게시물 좋아요 여부 확인
 * @param postId 게시물 id
 * @returns 좋아요 여부
 */
export const checkLikedPost = async (postId: number): Promise<boolean> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("post_like")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("좋아요 여부 조회 오류:", error);
    return false;
  }

  return !!data;
};

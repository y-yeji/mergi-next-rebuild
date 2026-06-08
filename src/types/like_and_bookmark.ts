/**
 * 좋아요 토글 반환 타입
 */
export type ToggleLikeResult = {
  isLiked: boolean;
  postId: number;
} | null;

/**
 * 북마크 토글 반환 타입
 */
export type ToggleBookmarkResult = {
  isBookmarked: boolean;
  postId: number;
} | null;

/**
 * 유저 좋아요 목록 타입
 */
export type UserPostLike = {
  post_id: number;
};

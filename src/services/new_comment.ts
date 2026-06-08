import { createClient } from "@/lib/supabase/client";
import { CommentRpcResponse } from "@/types/new_comment";
import type { PostCommentEntity } from "@/types/type";

const supabase = createClient();

/**
 * 댓글 작성
 */
export const addPostComment = async (
  postId: number,
  comment: string,
): Promise<boolean> => {
  const { data, error } = await supabase.rpc("add_post_comment", {
    p_post_id: postId,
    p_content: comment,
  });

  if (error) {
    console.error("댓글 작성 오류:", error);
    throw error;
  }

  return data;
};

/**
 * 게시글 댓글 조회
 */
export const getCommentsByPost = async (
  postId: number,
): Promise<CommentRpcResponse[]> => {
  const { data, error } = await supabase.rpc("get_comments_by_post", {
    p_post_id: postId,
  });

  if (error) {
    console.error("댓글 조회 오류:", error);
    throw error;
  }

  return (data ?? []) as CommentRpcResponse[];
};

/**
 * 댓글 삭제
 */
export const deletePostComment = async (
  commentId: number,
  postId: number,
): Promise<boolean> => {
  const { data, error } = await supabase.rpc("delete_post_comment", {
    p_comment_id: commentId,
    p_post_id: postId,
  });

  if (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }

  return data;
};

/**
 * 댓글 수정
 */
export const updatePostComment = async (
  commentId: number,
  comment: string,
  postId: number,
): Promise<boolean> => {
  const { data, error } = await supabase.rpc("update_post_comment", {
    p_comment_id: commentId,
    p_content: comment,
    p_post_id: postId,
  });

  if (error) {
    console.error("댓글 수정 오류:", error);
    throw error;
  }

  return data;
};

/**
 * 특정 게시글 댓글 개수 조회
 */
export const getCommentCount = async (postId: number): Promise<number> => {
  const { count, error } = await supabase
    .from("post_comments")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("post_id", postId);

  if (error) {
    console.error("댓글 개수 조회 오류:", error);
    throw error;
  }

  return count ?? 0;
};

/**
 * 특정 댓글 단건 조회
 */
export const getCommentById = async (
  commentId: number,
): Promise<PostCommentEntity | null> => {
  const { data, error } = await supabase
    .from("post_comments")
    .select("*")
    .eq("id", commentId)
    .single();

  if (error) {
    console.error("댓글 단건 조회 오류:", error);
    throw error;
  }

  return data;
};

/**
 * 특정 게시글 최신 댓글 조회
 */
export const getRecentComments = async (
  postId: number,
  limit = 5,
): Promise<PostCommentEntity[]> => {
  const { data, error } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("최신 댓글 조회 오류:", error);
    throw error;
  }

  return data ?? [];
};

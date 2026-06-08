import { createClient } from "@/lib/supabase/client";
import { PostCommentEntity } from "@/types/type";

const supabase = createClient();

/**
 * 특정 게시물의 댓글 목록 조회 (작성시간 오름차순)
 * @param postId - 댓글을 조회할 게시물 id
 */
export const getPostComments = async (
  postId: number,
): Promise<PostCommentEntity[] | null> => {
  const { data, error } = await supabase
    .from("post_comments")
    .select()
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

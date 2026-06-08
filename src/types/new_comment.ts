import { PostCommentEntity } from "./type";

/**
 * 댓글 조회 RPC 반환 타입
 */
export interface CommentRpcResponse extends PostCommentEntity {
  replies?: CommentRpcResponse[];
}

import { getPostComments } from "@/services/comments";
import { PostEntity, UserListEntity } from "./type";

/** RPC 필터 타입 */
export type PostFilters = {
  recruit_type?: string;
  recruit_field?: string;
  on_offline?: string;
  positions?: string[];
  stacks?: string[];
  [key: string]: unknown;
};

/** RPC 페이지네이션 응답 타입 */
export type PostPaginationResult = {
  posts: PostRpcRow[];
  total_post: number;
  page: number;
  total_page: number;
};

/** RPC에서 반환되는 게시물 행 타입 */
export type PostRpcRow = PostEntity & {
  position?: string[];
  techStack?: string[];
  name?: string;
  like_count?: number;
};

/** 게시물 상세 타입 */
export type PostDetails = PostEntity & {
  position: string[];
  techStack: string[];
  comments: Awaited<ReturnType<typeof getPostComments>>;
  user: UserListEntity;
};

/** 게시물 생성/수정 결과 타입 */
export type PostEditorResult = {
  data: PostEntity;
  positions: string[];
  techStacks: string[];
};

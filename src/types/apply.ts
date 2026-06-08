import { PostApplyEntity, UserListEntity } from "./type";


/** 신청 시 선택 포지션 타입 */
export type SelectedPositions = string;

/** 신청 목록 조회 타입 */
export type ApplicationListItem = Pick<
  PostApplyEntity,
  | "created_at"
  | "proposer_name"
  | "proposer_id"
  | "proposer_positions"
  | "proposer_img_path"
  | "post_id"
  | "post_title"
  | "accepted"
  | "finished"
>;

/** 신청 생성 반환 타입 */
export type PostApplicationResult = PostApplyEntity[];

/** 신청 유저 정보 타입 */
export type ApplicantProfile = Pick<UserListEntity, "name" | "profile_img_path">;
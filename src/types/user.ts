import { UserListEntity } from "./type";

/** 포지션 + 스택 조합 타입 */
export type PositionWithStacks = {
  id: number;
  position: string | null;
  stacks: string[];
};

/** 최종 반환 유저 정보 타입 */
export type UserInfo = UserListEntity & {
  positions: PositionWithStacks[];
};

/** 온보딩/수정 시 포지션 입력 타입 */
export type PositionInput = {
  position: string;
  stacks: string[];
};

/** 프로필 생성 에러 코드 */
export type ProfilePostError = "user_id_error" | "name_error" | "other_error";

/** 프로필 수정 에러 코드 */
export type ProfileUpdateError = "name_error" | "other_error";

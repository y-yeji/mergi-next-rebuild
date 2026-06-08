import { type Database } from "@/types/database.types";

//post 테이블
export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type PostInsert = Database["public"]["Tables"]["post"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["post"]["Update"];

//Post Apply List 테이블
export type PostApplyEntity =
  Database["public"]["Tables"]["post_apply_list"]["Row"];
export type PostApplyInsert =
  Database["public"]["Tables"]["post_apply_list"]["Insert"];
export type PostApplyUpdate =
  Database["public"]["Tables"]["post_apply_list"]["Update"];

//Post Bookmark 테이블
export type PostBookmarkEntity =
  Database["public"]["Tables"]["post_bookmark"]["Row"];
export type PostBookmarkInsert =
  Database["public"]["Tables"]["post_bookmark"]["Insert"];
export type PostBookmarkUpdate =
  Database["public"]["Tables"]["post_bookmark"]["Update"];

//Post Comments 테이블
export type PostCommentEntity =
  Database["public"]["Tables"]["post_comments"]["Row"];
export type PostCommentInsert =
  Database["public"]["Tables"]["post_comments"]["Insert"];
export type PostCommentUpdate =
  Database["public"]["Tables"]["post_comments"]["Update"];

//Post Like 테이블
export type PostLikeEntity = Database["public"]["Tables"]["post_like"]["Row"];
export type PostLikeInsert =
  Database["public"]["Tables"]["post_like"]["Insert"];
export type PostLikeUpdate =
  Database["public"]["Tables"]["post_like"]["Update"];

//Post Positions 테이블
export type PostPositionEntity =
  Database["public"]["Tables"]["post_positions"]["Row"];
export type PostPositionInsert =
  Database["public"]["Tables"]["post_positions"]["Insert"];
export type PostPositionUpdate =
  Database["public"]["Tables"]["post_positions"]["Update"];

//Post Stacks 테이블
export type PostStackEntity =
  Database["public"]["Tables"]["post_stacks"]["Row"];
export type PostStackInsert =
  Database["public"]["Tables"]["post_stacks"]["Insert"];
export type PostStackUpdate =
  Database["public"]["Tables"]["post_stacks"]["Update"];

//User List 테이블
export type UserListEntity = Database["public"]["Tables"]["user_list"]["Row"];
export type UserListInsert =
  Database["public"]["Tables"]["user_list"]["Insert"];
export type UserListUpdate =
  Database["public"]["Tables"]["user_list"]["Update"];

//User List Positions 테이블
export type UserListPositionEntity =
  Database["public"]["Tables"]["user_list_positions"]["Row"];
export type UserListPositionInsert =
  Database["public"]["Tables"]["user_list_positions"]["Insert"];
export type UserListPositionUpdate =
  Database["public"]["Tables"]["user_list_positions"]["Update"];

//User List Stacks 테이블
export type UserListStackEntity =
  Database["public"]["Tables"]["user_list_stacks"]["Row"];
export type UserListStackInsert =
  Database["public"]["Tables"]["user_list_stacks"]["Insert"];
export type UserListStackUpdate =
  Database["public"]["Tables"]["user_list_stacks"]["Update"];

//Notifications 테이블
export type NotificationEntity =
  Database["public"]["Tables"]["notifications"]["Row"];
export type NotificationInsert =
  Database["public"]["Tables"]["notifications"]["Insert"];
export type NotificationUpdate =
  Database["public"]["Tables"]["notifications"]["Update"];

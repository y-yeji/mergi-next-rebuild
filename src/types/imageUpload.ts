/**
 * 업로드 가능한 버킷 이름 타입
 */
export type StorageBucket = "user_images" | "post_images";

/**
 * 이미지 업로드 반환 타입
 */
export type UploadImageResult = {
  publicUrl: string;
  fileName: string;
};

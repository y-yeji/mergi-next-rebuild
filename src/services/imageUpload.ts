import { createClient } from "@/lib/supabase/client";
import { StorageBucket, UploadImageResult } from "@/types/imageUpload";

const supabase = createClient();

/**
 * 파일명 안전하게 인코딩
 */
const encodeFileName = (fileName: string): string => {
  return encodeURIComponent(fileName).replace(/%/g, "");
};

/**
 * Supabase Storage 이미지 업로드 API
 * @param file 업로드할 File 객체
 * @param bucket 업로드할 storage bucket 이름
 * @returns 업로드된 public URL
 */
export const uploadImage = async (
  file: File,
  bucket: StorageBucket = "user_images",
): Promise<UploadImageResult | null> => {
  try {
    // 파일명 인코딩
    const encodedFileName = encodeFileName(file.name);

    /**
     * 같은 이름 파일 존재 여부 확인
     */
    const { data: existingFiles, error: listError } = await supabase.storage
      .from(bucket)
      .list("");

    if (listError) {
      console.error("파일 조회 오류:", listError);
      return null;
    }

    const isExistFile = existingFiles?.some(
      (item) => item.name === encodedFileName,
    );

    /**
     * 파일이 없으면 업로드 진행
     */
    if (!isExistFile) {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(encodedFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("이미지 업로드 오류:", uploadError);
        return null;
      }
    }

    /**
     * public URL 생성
     */
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(encodedFileName);

    return {
      publicUrl,
      fileName: encodedFileName,
    };
  } catch (error) {
    console.error("uploadImage 예상치 못한 오류:", error);
    return null;
  }
};

/**
 * 여러 이미지 업로드
 * @param files File[]
 * @param bucket storage bucket 이름
 * @returns 업로드된 public URL 배열
 */
export const uploadMultipleImages = async (
  files: File[],
  bucket: StorageBucket = "post_images",
): Promise<string[]> => {
  try {
    const uploadResults = await Promise.all(
      files.map((file) => uploadImage(file, bucket)),
    );

    return uploadResults
      .filter((result): result is UploadImageResult => result !== null)
      .map((result) => result.publicUrl);
  } catch (error) {
    console.error("다중 이미지 업로드 오류:", error);
    return [];
  }
};

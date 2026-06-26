"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOnboardingStore } from "@/store/onboardingStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfilePromptModalProps {
  nickname: string;
}

const ProfilePromptModal = ({ nickname }: ProfilePromptModalProps) => {
  const router = useRouter();
  const reset = useOnboardingStore((state) => state.reset);

  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col items-center py-[58px] px-[66px] bg-secondary-2"
      >
        <DialogHeader>
          <DialogTitle className="mb-[17px] text-center">
            <p className="h2-b">
              환영합니다, <span className="text-primary-3">{nickname}</span> 님!
            </p>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1 text-gary-80 text-center">
            <span className="body-large-m">
              이 외에도 더 많은 항목을 프로필에 추가할 수 있어요.
            </span>
            <span className="body-large-m">지금 추가하러 가볼까요?</span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <Image
            src="/images/onboard_icon.png"
            alt="파일폴더이미지"
            width={119}
            height={119}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => router.push("/")}
              className="w-[179px] h-[45px] py-3 text-gray-70 rounded-lg body-r hover:text-black cursor-pointer modal-button-shadow"
            >
              나중에 할게요
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => {
              reset();
              router.push("/mypage/edit");
            }}
            className="w-[179px] h-[45px] py-3 bg-[#364861]/80 rounded-lg body-r text-white hover:bg-[#364861] cursor-pointer"
          >
            네, 추가할게요
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePromptModal;

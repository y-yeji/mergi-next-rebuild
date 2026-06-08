import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import AuthButton from "./AuthButton";
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithKakao,
} from "@/services/auth";

const AuthModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleGoogleLoginClick = () => {
    signInWithGoogle();
  };
  const handleGithubLoginClick = () => {
    signInWithGithub();
  };
  const handleKakaoLoginClick = () => {
    signInWithKakao();
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            className="w-[66px] h-8 px-3 h4-b bg-white border-[1.5px] border-primary-4 rounded-[50px] text-primary-3 cursor-pointer"
            style={{ backgroundColor: "transparent" }}
          >
            로그인
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="w-[500px] h-[540px] py-[86px] bg-secondary-2 rounded-[20px]"
        >
          <DialogClose asChild>
            <button className="absolute top-5 right-5 text-gray-50 cursor-pointer">
              <XIcon className="size-7" />
            </button>
          </DialogClose>
          <DialogHeader className="gap-0">
            <DialogTitle className="font-jalnan text-[38px] text-center text-primary-2">
              Mergi
            </DialogTitle>
            <DialogDescription className="mt-5 mb-[17px] text-center text-gray-80">
              <span className="h2-b">머지에서 머하지?</span>
            </DialogDescription>
            <DialogDescription className="text-center text-gray-80 flex flex-col">
              <span className="h4-b">지금 바로 프로젝트를 함께할</span>
              <span className="h4-b">팀원을 찾아보세요!</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid justify-center gap-[11px]">
            <div onClick={handleGoogleLoginClick}>
              <AuthButton
                authIconSrc="/images/google_icon.svg"
                authButtonAlt="구글로고"
                authLabel="Google로 시작하기"
              />
            </div>
            <div onClick={handleGithubLoginClick}>
              <AuthButton
                authIconSrc="/images/github_icon.svg"
                authButtonAlt="깃허브로고"
                authLabel="Github로 시작하기"
              />
            </div>
            <div onClick={handleKakaoLoginClick}>
              <AuthButton
                authIconSrc="/images/kakao_icon.svg"
                authButtonAlt="카카오로고"
                authLabel="Kakao로 시작하기"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;

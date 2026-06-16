"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bell, PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Notification from "./Notification";
import { useEffect, useRef, useState } from "react";
import AuthModal from "../auth/AuthModal";
import { useAuthSession } from "@/hooks/useAuthSession";
import { createClient } from "@/lib/supabase/client";

const Header = () => {
  const supabase = createClient();
  const session = useAuthSession();
  const user = session?.user;
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const notiRef = useRef<HTMLDivElement>(null);
  const bellBtnRef = useRef<HTMLButtonElement>(null);

  const toggleNotification = () => {
    setIsOpenNotification((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpenNotification) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        notiRef.current &&
        !notiRef.current.contains(e.target as Node) &&
        bellBtnRef.current &&
        !bellBtnRef.current.contains(e.target as Node)
      ) {
        setIsOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenNotification]);

  return (
    <header className="fixed top-0 left-0 z-20 w-full h-[80px] py-[21px] px-10 bg-white">
      <nav className="max-w-[1120px] mx-auto flex items-center justify-between">
        <div className="flex flex-1 mr-[250px]">
          <Link href="/" className="mr-[100px]">
            <Image
              src="/images/logo.svg"
              alt="mergi 로고"
              width={96}
              height={36}
            />
          </Link>
          <ul className="flex flex-1 items-center justify-between h3-b">
            <li>
              <Link href="/study">스터디</Link>
            </li>
            <li>
              <Link href="/project">프로젝트</Link>
            </li>
            <li>
              <Link href="/service">서비스</Link>
            </li>
          </ul>
        </div>
        {user?.id ? (
          <div>
            <ul className="flex items-center justify-between gap-6">
              {/* 포스트 작성 */}
              <li>
                <Link href="/" className="group relative cursor-pointer">
                  <PencilLine
                    className="text-gray-70 group-hover:text-primary-4 transition-colors"
                    size={24}
                  />
                  <span
                    className="absolute z-10 left-1/2 top-full -translate-x-1/2 hidden group-hover:flex
      min-w-[50px] h-5 mt-1 px-0.5 text-center rounded-sm caption-r
      bg-primary-4 text-white transition-opacity items-center justify-center"
                  >
                    작성하기
                  </span>
                </Link>
              </li>
              {/* 알림 */}
              <li>
                <button
                  ref={bellBtnRef}
                  onClick={toggleNotification}
                  className="group relative cursor-pointer"
                >
                  <Bell
                    className="relative top-1 text-gray-70 group-hover:text-primary-4 transition-colors"
                    size={28}
                  />
                  <span
                    className="absolute z-5 left-1/2 top-full -translate-x-1/2 hidden group-hover:flex
      min-w-[50px] h-5 mt-1 px-0.5 text-center rounded-sm caption-r
      bg-primary-4 text-white transition-opacity items-center justify-center"
                  >
                    알림
                  </span>
                </button>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="group size-[40px] cursor-pointer">
                      <AvatarImage
                        src="/images/default-user-image.svg"
                        className="object-cover"
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={cn(
                      "min-w-0 h-16 body-r px-4 py-1.5 bg-secondary-3 overflow-visible ",
                    )}
                    style={{ boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.11)" }}
                    align="end"
                  >
                    <DropdownMenuItem
                      className={cn(
                        "p-0 pb-[10px] justify-center hover:text-primary-3",
                      )}
                    >
                      <Link href="#">마이페이지</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={cn("p-0 justify-center hover:text-primary-3")}
                    >
                      <button onClick={() => supabase.auth.signOut()}>
                        로그아웃
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        ) : (
          <div className="items-center">
            <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
          </div>
        )}
      </nav>

      {isOpenNotification && (
        <div ref={notiRef} className="absolute right-100 top-[66px]">
          <Notification onClose={() => setIsOpenNotification(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;

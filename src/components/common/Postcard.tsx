"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Bookmark, ThumbsUp } from "lucide-react";
import { Badge } from "../ui/badge";
import SkillLogo from "./SkillLogo";
import { formatDate } from "@/lib/formatDate";
import { toggleBookmark, toggleLike } from "@/services/like_and_bookmark";
import { useState } from "react";
import { useAuthModalStore } from "@/store/authModalStore";
import { getSkillByStack } from "@/lib/getSkillByStack";
import Link from "next/link";
interface PostcardProps {
  postId: number;
  content: string;
  usernickName: string;
  end_date: string;
  techStack: string[];
  position: string[];
}

const Postcard = ({
  postId,
  content,
  usernickName,
  end_date,
  techStack,
  position,
}: PostcardProps) => {
  const { openModal } = useAuthModalStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const MAX_VISIBLE_SKILLS = 5;
  const MAX_VISIBLE_POSITION = 2;

  const remainingSkillsCount = () =>
    Math.max(techStack.length - MAX_VISIBLE_SKILLS, 0);

  const remainingPositionCount = () =>
    Math.max(position.length - MAX_VISIBLE_POSITION, 0);

  const handleToggleLike = async (postId: number) => {
    const result = await toggleLike(postId);
    if (result === null) {
      openModal();
      return;
    }

    if ("error" in result && result.error === "not authenticated") {
      openModal();
      return;
    }

    setIsLiked(result.isLiked);
  };

  const handleToggleBookmark = async (postId: number) => {
    const result = await toggleBookmark(postId);
    if (result === null) {
      openModal();
      return;
    }

    if ("error" in result && result.error === "not authenticated") {
      openModal();
      return;
    }

    setIsBookmarked(result.isBookmarked);
  };

  return (
    <Link href={`/posts/${postId}`}>
      <div className="w-full max-w-[258px] h-[295px] p-6 border rounded-lg bg-white input-shadow duration-300 cursor-pointer card-shadow">
        <div className="flex justify-between mb-[15px]">
          <span className="flex items-center gap-[10px]">
            <span>
              <Avatar className="group size-[33px] cursor-pointer">
                <AvatarImage
                  src="/images/default-user-image.svg"
                  className="object-cover"
                  alt="유저프로필이미지"
                />
              </Avatar>
            </span>
            <span className="body-b">{usernickName}</span>
          </span>
          <span className="flex items-center gap-[6px]">
            <span>
              <ThumbsUp
                onClick={() => handleToggleLike(postId)}
                size={24}
                className={
                  isLiked ? "text-blue-500 fill-current" : "text-gray-50"
                }
              />
            </span>
            <span>
              <Bookmark
                onClick={() => handleToggleBookmark(postId)}
                size={24}
                className={
                  isBookmarked ? "text-blue-500 fill-current" : "text-gray-50"
                }
              />
            </span>
          </span>
        </div>
        <div className="flex flex-col justify-between h-[170px]">
          <div className="flex-1 mb-4 overflow-hidden">
            <p className="body-large-r line-clamp-3">{content}</p>
          </div>
          <div className="mb-[10px]">
            <ul className="flex items-center gap-1 mb-[13px]">
              {techStack.slice(0, 5).map((stack) => {
                const matchedSkill = getSkillByStack(stack);
                if (!matchedSkill) return null;
                return (
                  <li key={stack}>
                    <SkillLogo
                      name={matchedSkill.name}
                      skill={matchedSkill.skill}
                    />
                  </li>
                );
              })}
              {remainingSkillsCount() > 0 && (
                <li className="w-7 h-7 rounded-full flex items-center justify-center border border-solid border-primary-3 caption-b text-primary-3 bg-white">
                  +{remainingSkillsCount()}
                </li>
              )}
            </ul>
            <ul className="flex gap-[5px] mb-[10px]">
              {position.slice(0, 2).map((position) => (
                <li key={position}>
                  <Badge variant="position">{position}</Badge>
                </li>
              ))}
              {remainingPositionCount() > 0 && (
                <li className="py-[3px] px-2.5 bg-gray-5 text-primary-2 rounded-md caption-b">
                  +{remainingPositionCount()}
                </li>
              )}
            </ul>
          </div>
        </div>
        <span className="caption-r text-gray-50">
          마감일 | <span>{formatDate(end_date)}</span>
        </span>
      </div>
    </Link>
  );
};
export default Postcard;

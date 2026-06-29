"use client";

import Link from "next/link";
import { ChevronDown, LinkIcon } from "lucide-react";
import SkillBadge from "@/components/common/SkillBadge";
import { useState } from "react";

interface ProfileTabProps {
  long_introduce: string | undefined;
  link: string[] | undefined;
  positionWithStacks: {
    position: string;
    user_list_stacks: { stacks: string[] }[];
  }[];
}

const ProfileTab = ({
  long_introduce,
  link,
  positionWithStacks,
}: ProfileTabProps) => {
  const [isOpenIntroduce, setIsOpenIntroduce] = useState(true);

  const handleIntroduceToggle = () => {
    setIsOpenIntroduce((prev) => !prev);
  };
  return (
    <div className="pb-10">
      <section className="relative mb-11">
        <div className="mb-[10px]" onClick={handleIntroduceToggle}>
          <button type="button" className="flex items-center gap-[10px]">
            <h3 className="h3-b text-gray-80">자기소개</h3>
            <ChevronDown
              className="text-gray-80 cursor-pointer"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div
          className={`h-auto p-6 body-r text-gray-80 bg-secondary-3 rounded-lg input-shadow ${
            isOpenIntroduce ? "block" : "hidden"
          }`}
        >
          {long_introduce}
        </div>
      </section>
      <section className="mb-11">
        <h3 className="mb-[10px] h3-b text-gray-80">링크</h3>
        <ul>
          {(link ?? []).map((linkItem, index) => (
            <li
              key={`${linkItem}-${index}`}
              className="w-full h-8 flex items-center gap-[19px] py-[5.5px] px-[15px] mb-[10px] bg-secondary-3"
            >
              <LinkIcon width={22} height={22} className="text-gray-80" />
              <Link
                href={linkItem}
                className="body-r text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkItem}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-[10px] h3-b text-gray-80">포지션 & 스킬</h3>
        <div className="p-7 rounded-lg bg-secondary-3 input-shadow">
          {positionWithStacks.map(({ position, user_list_stacks }) => (
            <ul key={position} className="mb-7">
              <h4 className="body-large-m text-gray-80 mb-3">{position}</h4>
              <li className="flex gap-4">
                {(user_list_stacks[0]?.stacks ?? []).map((skill) => (
                  <SkillBadge key={skill} name={skill} skill={skill} />
                ))}
              </li>
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileTab;

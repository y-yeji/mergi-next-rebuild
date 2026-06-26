"use client";

import SkillBadge from "@/components/common/SkillBadge";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import ProfilePromptModal from "@/components/onboarding/ProfilePromptModal";
import { Button } from "@/components/ui/button";
import { POSITION_SKILLS } from "@/constants/position";
import { createClient } from "@/lib/supabase/client";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Step2 = () => {
  const router = useRouter();
  const supabase = createClient();
  const { nickname, introduce, positions } = useOnboardingStore();
  const reset = useOnboardingStore((state) => state.reset);
  const [selectedTab, setSelectedTab] = useState(positions[0] ?? "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showProfilePromptModal, setShowProfilePromptModal] = useState(false);

  useEffect(() => {
    if (!nickname || positions.length === 0) {
      router.push("/onboarding/step1");
    }
  }, []);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((skillName) => skillName !== skill)
        : [...prev, skill],
    );
  };

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: newUser, error } = await supabase
      .from("user_list")
      .insert({
        user_id: user.id,
        name: nickname,
        short_introduce: introduce,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !newUser) {
      console.error("프로필 생성 실패", error?.message);
      return;
    }

    for (const pos of positions) {
      const { data: newPos, error: posError } = await supabase
        .from("user_list_positions")
        .insert({
          profile_id: newUser.id,
          position: pos,
          created_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (posError || !newPos) {
        console.error(`포지션 저장 실패 (${pos})`, posError?.message);
        continue;
      }

      const skillsForPos = selectedSkills.filter((skill) =>
        POSITION_SKILLS[pos]?.includes(skill),
      );

      const { error: stackError } = await supabase
        .from("user_list_stacks")
        .insert({
          position_id: newPos.id,
          stacks: skillsForPos,
          created_at: new Date().toISOString(),
        });

      if (stackError)
        console.error(`스킬 저장 실패 (${pos})`, stackError.message);
    }

    setShowProfilePromptModal(true);
  };

  const skillList = POSITION_SKILLS[selectedTab] || [];

  return (
    <>
      {showProfilePromptModal && <ProfilePromptModal nickname={nickname} />}
      <div className="h-[683px]  p-5 flex flex-col justify-between">
        <div>
          <OnboardingStepper currentStep={2} totalSteps={2} />
          <section className="">
            <div className="mb-7">
              <p className="h4-b text-gray-80">
                {nickname}님은{" "}
                {positions.map((pos, index) => (
                  <span key={pos}>
                    <span className="text-primary-3">{pos}</span>
                    {index < positions.length - 1 && ", "}
                  </span>
                ))}
                을 선택해주셨어요.
              </p>
              <p className="h4-b text-gray-80">
                관심있거나 보유하고 있는 스킬을 선택해주세요.
              </p>
            </div>
            <div className="max-w-[534px]">
              <ul className="flex gap-4 pb-2 mb-[22px] body-b" role="tablist">
                {positions.map((pos) => (
                  <li key={pos}>
                    <button
                      type="button"
                      className={`cursor-pointer ${
                        selectedTab === pos
                          ? "text-primary-3 border-b-2 border-primary-3"
                          : ""
                      }`}
                      onClick={() => handleTabClick(pos)}
                    >
                      {pos}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-3">
                {skillList.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <li key={skill}>
                      <button
                        type="button"
                        onClick={() => handleSkillClick(skill)}
                        className="w-full"
                      >
                        <SkillBadge
                          name={skill}
                          skill={skill}
                          className={`hover:border-primary-3 hover:text-primary-3 cursor-pointer ${
                            isSelected
                              ? "border border-primary-3 text-primary-3 bg-secondary-2"
                              : "bg-white"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => router.push("/onboarding/step1")}
            className="w-full max-w-[262px] py-[14px] mr-[10px] cusor-pointer"
            tone="primary"
          >
            이전
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full max-w-[262px] py-[14px] cursor-pointer"
            tone="primary"
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};
export default Step2;

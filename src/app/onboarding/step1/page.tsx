"use client";

import PositionSmallButton from "@/components/common/PositionSmallButton";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { checkDuplicateNickname } from "@/services/user";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Step1 = () => {
  const router = useRouter();
  const setStep1Data = useOnboardingStore((state) => state.setStep1Data);
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<
    "idle" | "valid" | "duplicate" | "invalid"
  >("idle");
  const [introduce, setIntroduce] = useState("");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const handleCheckNickname = async () => {
    const regex = /^[a-zA-Z0-9가-힣]+$/;
    if (!regex.test(nickname)) {
      setNicknameStatus("invalid");
      return;
    }

    const isDuplicate = await checkDuplicateNickname(nickname);

    if (isDuplicate) {
      setNicknameStatus("duplicate");
    } else {
      setNicknameStatus("valid");
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10);

    setNickname(value);
  };

  const handleShortIntroduceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.slice(0, 20);

    setIntroduce(value);
  };

  const handleNextClick = () => {
    if (!nickname || selectedPositions.length === 0) return;
    if (nicknameStatus !== "valid") {
      alert("닉네임 중복확인을 해주세요!");
      return;
    }
    setStep1Data({ nickname, introduce, positions: selectedPositions });
    router.push("/onboarding/step2");
  };

  return (
    <div className="h-[683px] p-5">
      <OnboardingStepper currentStep={1} totalSteps={2} />
      <section className="mb-7">
        <p className="h4-b mb-[10px] text-gray-80">닉네임을 입력해주세요.</p>
        <div>
          <Label className="relative mb-1">
            <Input
              placeholder="닉네임"
              className="w-[534px] h-[46px] pl-4 py-2 placeholder:text-gray-40 input-shadow"
              value={nickname}
              onChange={handleNicknameChange}
              maxLength={10}
            />
            <Button
              type="submit"
              variant="small"
              tone="primary"
              className="absolute left-[86%] caption-r cursor-pointer"
              onClick={handleCheckNickname}
            >
              중복확인
            </Button>
          </Label>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {nicknameStatus === "invalid" && (
              <p className="caption-r text-accent-error">
                특수문자는 사용할 수 없어요
              </p>
            )}
            {nicknameStatus === "duplicate" && (
              <p className="caption-r text-accent-error">
                이미 사용 중인 닉네임이에요
              </p>
            )}
            {nicknameStatus === "valid" && (
              <p className="caption-r text-primary-3">
                사용 가능한 닉네임이에요
              </p>
            )}
            {nicknameStatus === "idle" && (
              <p className="caption-r text-gray-50">
                중복된 이름ㆍ특수문자 사용불가
              </p>
            )}
          </div>
          <p className="caption-r text-gray-50">{nickname.length}/10</p>
        </div>
      </section>
      <section className="mb-7">
        <p className="h4-b mb-[10px] text-gray-80">
          간단하게 본인을 소개해주세요.
        </p>
        <Label className="relative mb-1">
          <Input
            placeholder="한 줄 소개"
            value={introduce}
            onChange={handleShortIntroduceChange}
            className="w-[534px] h-[46px] pl-4 py-2 placeholder:text-gray-40 input-shadow"
            maxLength={20}
          />
        </Label>
        <p className="text-right caption-r text-gray-50">
          {introduce.length}/20
        </p>
      </section>
      <section className="mb-[78px] max-w-[534px]">
        <div className="mb-[10px] flex justify-between items-center">
          <p className="h4-b text-gray-80">희망하시는 포지션을 선택해주세요.</p>
          <span className="caption-r text-gray-50">최대 3개 선택</span>
        </div>
        <PositionSmallButton
          className="flex flex-wrap gap-x-[18px] gap-y-3 justify-between"
          value={selectedPositions}
          onChange={setSelectedPositions}
          max={3}
          buttonWidth="w-[120px]"
        />
      </section>
      <Button
        type="submit"
        tone="primary"
        className="w-full px-[253px] py-[14px] rounded-lg cursor-pointer"
        onClick={handleNextClick}
      >
        다음
      </Button>
    </div>
  );
};

export default Step1;

import { SKILLS } from "@/constants/skills";

export const getSkillByStack = (stackName: string) => {
  const normalized = stackName.toLowerCase().replace(/[.\s-]/g, "");

  return SKILLS.find((s) => s.skill.replace(/_/g, "") === normalized);
};

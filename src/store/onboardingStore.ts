"use client";

import { create } from "zustand";

interface OnboardgingStore {
  nickname: string;
  introduce: string;
  positions: string[];
  skills: string[];
  setStep1Data: (data: {
    nickname: string;
    introduce: string;
    positions: string[];
  }) => void;
  setSkills: (skills: string[]) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardgingStore>((set) => ({
  nickname: "",
  introduce: "",
  positions: [],
  skills: [],
  setStep1Data: (data) => set(data),
  setSkills: (skills) => set({ skills }),
  reset: () => set({ nickname: "", introduce: "", positions: [], skills: [] }),
}));

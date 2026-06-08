import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// 구글 로그인 API
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    console.error("Google 로그인 실패:", error.message);
  }
};

// 깃허브 로그인 API
export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    console.error("Github 로그인 실패", error.message);
  }
};

// 카카오 로그인  API
export const signInWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    console.error("Kakao 로그인 실패", error.message);
  }
};

// 로그아웃 API
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("로그아웃 실패", error.message);
  }
};

//유저 로그인 정보 get API
export const getUserLoggedIn = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("유저 정보 가져오기 실패", error.message);
  }

  return user;
};

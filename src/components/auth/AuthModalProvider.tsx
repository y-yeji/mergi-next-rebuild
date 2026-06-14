"use client";

import AuthModal from "@/components/auth/AuthModal";
import { useAuthModalStore } from "@/store/authModalStore";

const AuthModalProvider = () => {
  const { isOpen, closeModal } = useAuthModalStore();
  return <AuthModal open={isOpen} onOpenChange={closeModal} />;
};

export default AuthModalProvider;

"use client";
import React, { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/loginForm.component";

const Login = () => {
  const { loginUser, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    console.log("can redirect?");
    if (isAuthenticated) {
      console.log("redirecting: yes");
      router.push("/app");
    }
  }, [isAuthenticated, router]);

  return <LoginForm loginUser={loginUser} />;
};

export default Login;

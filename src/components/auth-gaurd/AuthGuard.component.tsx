"use client";
import { useAppDispatch, useAppSelector } from "@/state/auth/auth-hook";
import { verifyToken } from "@/state/auth/authslice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const state = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(verifyToken()).unwrap();
      } catch (error) {
        console.log(error);
        if (
          !pathName.startsWith("/login") ||
          !pathName.startsWith("/register")
        ) {
          router.replace("/login");
        }
      }
    };
    checkAuth();
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.isAuthenticated) {
    return (
      <div>
        <h1>{JSON.stringify(state)}</h1>
        {children}
      </div>
    );

    // return null;
  }
  return <div>Loading...</div>;
};

export default AuthGuard;

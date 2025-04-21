"use client";
import { useAppDispatch, useAppSelector } from "@/state/auth/auth-hook";
import { verifyToken } from "@/state/auth/authslice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAppSelector((state) => state.auth);

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
  }, [dispatch, router, pathName]);
  if (isLoading) {
    return <div>Loading</div>;
  }

  return <div>{children}</div>;
};

export default AuthGuard;

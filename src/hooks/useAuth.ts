// hooks/useAuth.ts
import { useCallback } from "react";
import { LoginUser, RegisterUser } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/state/auth/auth-hook";
import { login, logout, signup, verifyToken } from "@/state/auth/authslice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, token, ownerId, isLoading, isAuthenticated, error } =
    useAppSelector((state) => state.auth);

  const loginUser = useCallback(
    async (credentials: LoginUser) => {
      try {
        await dispatch(login(credentials)).unwrap();
        router.push("/app");
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [dispatch, router],
  );

  const registerUser = useCallback(
    async (userData: RegisterUser) => {
      try {
        await dispatch(signup(userData)).unwrap();
        router.push("/app");
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [dispatch, router],
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    router.push("/login");
  }, [dispatch, router]);

  const checkAuth = useCallback(async () => {
    try {
      await dispatch(verifyToken()).unwrap();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [dispatch]);

  return {
    user,
    ownerId,
    token,
    isLoading,
    isAuthenticated,
    error,
    loginUser,
    registerUser,
    logoutUser,
    checkAuth,
  };
};

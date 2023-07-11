"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Login } from "@components/Form";
import { useAppDispatch, useAppSelector } from "@store/store";
import { authenticate } from "@store/slices/authSlice";
import { LoadingPage } from "@components/Common";
import { TITLE_TECHCELL } from "@constants/data";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  useEffect(() => {
    document.title = `Đăng Nhập - ${TITLE_TECHCELL}`;
  }, [document.title]);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <LoadingPage isLoading={true} /> : <Login />;
}

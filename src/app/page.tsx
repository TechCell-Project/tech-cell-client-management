"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Login } from "@components/Form";
import { useAppDispatch, useAppSelector } from "@store/store";
import { authenticate } from "@store/slices/authSlice";
import { LoadingPage } from "@components/Common";
import { TITLE_TECHCELL } from "@constants/data";
import { NoSSRWrapper } from "@components/Shared";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  useEffect(() => {
    document.title = `Đăng Nhập - ${TITLE_TECHCELL}`;
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <LoadingPage isLoading={true} />
  ) : (
    <NoSSRWrapper>
      <Login />
    </NoSSRWrapper>
  );
}

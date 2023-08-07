'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@styles/components/_login.module.scss';
import { LoginForm } from './LoginForm';
import { LoginModel } from '@models/Auth';
import { login } from '@store/slices/authSlice';
import { useAppDispatch } from '@store/store';
import { FormikHelpers } from 'formik';
import { IAlert } from '@interface/common';
import { AlertMessage } from '@components/Common';

export const Login = () => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<IAlert>();

  const handleSubmit = async (values: LoginModel, { resetForm }: FormikHelpers<LoginModel>) => {
    const response = await dispatch(login(values));
    if (response) {
      setAlert({
        type: response?.type,
        status: response?.status,
        message: response?.message,
        timeout: 4000,
      });
      setTimeout(() => setAlert(undefined), 4000);
    }
    resetForm();
  };

  return (
    <>
      {alert && <AlertMessage {...alert} />}
      <div className={styles.login}>
        <Image
          src="/login-bg.png"
          alt="Login Banner"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', top: 0 }}
        />
        <div className={styles.loginLogo}>
          <Image src="/logo-red.png" alt="Login Logo" width={150} height={50} />
        </div>
        <div className={styles.loginForm}>
          <div className={styles.loginFormInput}>
            <h1 className={styles.loginFormInputTitle}>Đăng nhập</h1>
            <span className={styles.loginFormInputDesc}>
              Nhập tài khoản và mật khẩu để đăng nhập!
            </span>
            <LoginForm handleSubmit={handleSubmit} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

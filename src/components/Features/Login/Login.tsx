'use client';

import Image from 'next/image';
import React from 'react';
import styles from '@styles/components/_login.module.scss';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <>
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
            <LoginForm/>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

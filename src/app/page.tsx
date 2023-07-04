'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Login } from '@components/Form';
import { useAppDispatch, useAppSelector } from '@store/store';
import { authenticate } from '@store/slices/authSlice';
import { LoadingPage } from '@components/Common';

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authenticate());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const timeout = setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <LoadingPage isLoading={true} /> : <Login />;
}

'use client';

import React, { FC } from 'react';
import { HashLoader } from 'react-spinners';
import { useTheme } from '@mui/material';
import styles from '@styles/components/_loading.module.scss';
import { ILoading } from '@interface/common';

export const LoadingPage: FC<ILoading> = ({ isLoading }) => {
    const theme = useTheme();

    return (
        isLoading && (
            <div className={styles.loadingWrapper}>
                <div className={styles.loadingSpinner}>
                    <HashLoader
                        color={theme.color.red}
                        loading={isLoading}
                        size={60}
                        speedMultiplier={0.8}
                    />
                    <span>Đang tải ...</span>
                </div>
            </div>
        )
    );
};

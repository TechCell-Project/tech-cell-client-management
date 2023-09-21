'use client';

import React, { FC } from 'react';
import { HashLoader } from 'react-spinners';
import { useTheme } from '@mui/material';
import styles from '@styles/components/_loading.module.scss';

export const LoadingPage: FC<{ isLoading: boolean; isBlur?: boolean }> = ({
  isLoading,
  isBlur,
}) => {
  const theme = useTheme();

  return (
    isLoading && (
      <div
        className={styles.loadingWrapper}
        style={{ backgroundColor: isBlur ? 'rgba(255, 255, 255, 0.315)' : '#fff' }}
      >
        <div className={styles.loadingSpinner}>
          <HashLoader color={theme.color.red} loading={isLoading} size={60} speedMultiplier={0.8} />
          <span>Đang tải ...</span>
        </div>
      </div>
    )
  );
};

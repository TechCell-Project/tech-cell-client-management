import React, { FC } from 'react';
import styles from '@styles/components/_background.module.scss';

interface Props {
  title?: string;
}

export const BackgroundTitle: FC<Props> = ({ title }) => {
  return <div className={styles.backgroundTitle}>BackgroundTitle</div>;
};

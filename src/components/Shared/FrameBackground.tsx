'use client';

import React, { FC, memo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BreadcrumbPath, ButtonCustom } from '@components/Common';
import { PATHS } from '@constants/data';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Register, CreateAttribute, CreateCategory } from '@components/Features';
import { getCurrentUserRole } from '@utils/index';
import { OpenCreateDialog } from '@models/Dialog';
import styles from '@styles/components/_background.module.scss';
import { Roles, RootRoutes } from '@constants/enum';

export const FrameBackground: FC = memo(() => {
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<OpenCreateDialog>(new OpenCreateDialog());

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const matchedPath = PATHS.find((path) => path.pathname === pathname);
    if (matchedPath) {
      setTitle(
        matchedPath.name !== 'Trang chủ'
          ? `Quản lý ${matchedPath.name.toLowerCase()}`
          : `${matchedPath.name} quản lý`,
      );
    } else if (pathname.startsWith(RootRoutes.PRODUCT_ROUTE)) {
      setTitle('Quản lý sản phẩm');
    } else if (pathname.startsWith(RootRoutes.ORDER_ROUTE)) {
      setTitle('Quản lý đơn hàng');
    } else if (pathname.startsWith(RootRoutes.ACCOUNT_ROUTE)) {
      setTitle('Quản lý tài khoản');
    } else {
      setTitle('');
    }
  }, [pathname]);

  const handleClick = (onClick: React.MouseEventHandler<HTMLButtonElement>) => {
    return (
      <ButtonCustom
        variant="outlined"
        content="Thêm mới"
        startIcon={<AddCircleRoundedIcon />}
        colorWhite
        handleClick={onClick}
        styles={{ padding: '7px 20px !important' }}
      />
    );
  };

  const renderAddButton = () => {
    if (pathname === RootRoutes.ACCOUNT_ROUTE && getCurrentUserRole() === Roles.SuperAdmin) {
      return handleClick(() => setIsOpen((prev) => ({ ...prev, openRegister: true })));
    } else if (pathname === RootRoutes.ATTRIBUTE_ROUTE) {
      return handleClick(() => setIsOpen((prev) => ({ ...prev, openAttribute: true })));
    } else if (pathname === RootRoutes.CATEGORY_ROUTE) {
      return handleClick(() => setIsOpen((prev) => ({ ...prev, openCategory: true })));
    } else if (pathname === RootRoutes.PRODUCT_ROUTE) {
      return handleClick(() => router.push(RootRoutes.PRODUCT_CREATE_ROUTE));
    }
  };

  return (
    <>
      <div className={styles.frame}>
        <div className={styles.frameChild}>
          <div className={styles.frameContent}>
            <div className={styles.frameContentTitle}>
              <h2>{title}</h2>
            </div>
            <BreadcrumbPath />
          </div>
          <div className={styles.frameAction}>{renderAddButton()}</div>
        </div>
      </div>

      {isOpen.openRegister && (
        <Register
          isOpen={isOpen.openRegister}
          handleClose={() => setIsOpen((prev) => ({ ...prev, openRegister: false }))}
        />
      )}

      {isOpen.openAttribute && (
        <CreateAttribute
          isOpen={isOpen.openAttribute}
          handleClose={() => setIsOpen((prev) => ({ ...prev, openAttribute: false }))}
        />
      )}

      {isOpen.openCategory && (
        <CreateCategory
          isOpen={isOpen.openCategory}
          handleClose={() => setIsOpen((prev) => ({ ...prev, openCategory: false }))}
        />
      )}
    </>
  );
});

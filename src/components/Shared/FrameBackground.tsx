import React, { FC, memo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbPath, ButtonCustom } from "@components/Common";
import { PATHS } from "@constants/data";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Register } from "@components/Form";
import styles from "@styles/components/_background.module.scss";
import { getCurrentUserRole } from "@utils/index";

const acceptRoutes = [
  "/dashboard/product",
  "/dashboard/account",
  "/dashboard/order",
];

export const FrameBackground: FC = memo(() => {
  const [title, setTitle] = useState<string>("");
  const [openRegister, setOpenRegister] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const matchedPath = PATHS.find((path) => path.pathname === pathname);
    if (matchedPath) {
      setTitle(
        matchedPath.name !== "Trang chủ"
          ? `Quản lý ${matchedPath.name.toLowerCase()}`
          : `${matchedPath.name} quản lý`
      );
    } else if (pathname.startsWith("/dashboard/product")) {
      setTitle("Quản lý sản phẩm");
    } else if (pathname.startsWith("/dashboard/order")) {
      setTitle("Quản lý đơn hàng");
    } else if (pathname.startsWith("/dashboard/account")) {
      setTitle("Quản lý tài khoản");
    } else {
      setTitle("");
    }
  }, [pathname]);

  const handleAdd = () => {
    if (pathname === "/dashboard/account") {
      setOpenRegister(true);
    } else if (pathname === "/dashboard/product") {
      router.push("/dashboard/product/create");
    } else return;
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
          <div className={styles.frameAction}>
            {acceptRoutes.includes(pathname) && (
              <>
                {pathname === "/dashboard/account" &&
                getCurrentUserRole() !== "SuperAdmin" ? null : (
                  <ButtonCustom
                    variant="outlined"
                    content="Thêm mới"
                    startIcon={<AddCircleRoundedIcon />}
                    colorWhite
                    handleClick={handleAdd}
                    styles={{ padding: "7px 20px !important" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {openRegister && (
        <Register
          isOpen={openRegister}
          handleClose={() => setOpenRegister(false)}
        />
      )}
    </>
  );
});

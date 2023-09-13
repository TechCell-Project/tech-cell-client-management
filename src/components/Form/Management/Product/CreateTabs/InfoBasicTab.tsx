import React, { memo } from "react";
import { Stack, Typography } from "@mui/material";
import styles from "@styles/components/_common.module.scss";
import { AttributeSection, InforSection, VariantSection } from "../SectionForm";

export const InfoBasicTab = memo(() => {
  return (
    <Stack
      flexDirection="column"
      alignItems="flex-start"
      gap={3}
      mt="20px"
      width="100%"
    >
      <Typography
        fontSize="0.9rem"
        fontWeight="500"
        className={styles.titleHighlight}
      >
        1. <i>Thông tin cơ bản</i>
      </Typography>
      <InforSection />

      <Typography
        fontSize="0.9rem"
        fontWeight="500"
        className={styles.titleHighlight}
      >
        2. <i>Thuộc tính chung</i>
      </Typography>
      <AttributeSection />

      <Typography
        fontSize="0.9rem"
        fontWeight="500"
        className={styles.titleHighlight}
      >
        3. <i>Biến thể</i>
      </Typography>
      <VariantSection />
    </Stack>
  );
});

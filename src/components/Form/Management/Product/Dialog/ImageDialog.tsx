import { ButtonCustom, ShowDialog } from "@components/Common";
import { Box, Stack } from "@mui/material";
import React from "react";
import { UploadFileCustom } from "../../../../Common/FormGroup/UploadFileCustom";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  name: string;
}

export const ImageDialog = (props: Props) => {
  return (
    <ShowDialog
      dialogTitle="Ảnh"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Box sx={{ width: "100%" }}>
        <UploadFileCustom name={props.name} />
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
          <ButtonCustom
            variant="outlined"
            handleClick={props.handleClose}
            content="Đóng"
          />
        </Stack>
      </Box>
    </ShowDialog>
  );
};

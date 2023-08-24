import { ButtonCustom, ShowDialog } from "@components/Common";
import { IColumnAttribute } from "@interface/data";
import { AttributeModel } from "@models/Attribute";
import { removeAttribute } from "@store/slices/attributeSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { enqueueSnackbar } from "notistack";
import React from "react";

interface Props {
  dataAttribute?: IColumnAttribute;
  isOpen: boolean;
  handleClose: () => void;
}

export const ConfirmDeleteAttribute = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.attribute)

  const handleConfirm = () => {
    dispatch(removeAttribute(String(props.dataAttribute?.id)))
      .then(() =>
        enqueueSnackbar("Xóa thông số thành công!", { variant: "success" })
      )
      .catch(() =>
        enqueueSnackbar("Có lỗi xảy ra, xóa thông số thất bại!", {
          variant: "error",
        })
      )
      .finally(() => props.handleClose());
  };

  return (
    <ShowDialog
      dialogTitle="Xóa thông số"
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={
        <>
          Bạn có chắc chắn muốn xóa thông số:
          <b style={{ display: "block" }}>{props.dataAttribute?.name}</b>
        </>
      }
    >
      <ButtonCustom
        variant="outlined"
        content="Hủy bỏ"
        handleClick={props.handleClose}
      />
      <ButtonCustom
        variant="contained"
        content="Xác nhận"
        disabled={isLoading}
        handleClick={handleConfirm}
      />
    </ShowDialog>
  );
};

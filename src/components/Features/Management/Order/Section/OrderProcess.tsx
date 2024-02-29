import React, { memo, useCallback, useState } from 'react';
import { ORDER_STATUS_OPTIONS } from '@constants/options';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useAppDispatch, useAppSelector } from '@store/store';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ButtonCustom, ShowDialog } from '@components/Common';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { useRouter } from 'next/navigation';
import { OrderProcessStep, PaymentMethod, PaymentStatus } from '@constants/enum';
import { DialogAction, TOrderStatusOptions } from '@interface/common';
import { editOrderStatus } from '@store/slices/orderSlice';

enum ActionOrderType {
  ChangeByStep = 'change_by_step',
  Cancel = 'cancel',
  Refund = 'refund'
}

const OrderProcess = () => {
  const [isOpenConfirm, setIsOpenConfirm] = useState({
    open: false,
    action: '',
  });

  const theme = useTheme();
  const router = useRouter();
  const { order } = useAppSelector((state) => state.order);
  const listStatus = ORDER_STATUS_OPTIONS.sort((a, b) => a.step - b.step)
    .filter((item) => item.value !== PaymentStatus.CANCELLED);
  const activeStatus = listStatus.find((item) => item.value === order?.orderStatus);
  const listStatusCancel = [ORDER_STATUS_OPTIONS[0], ...ORDER_STATUS_OPTIONS.slice(-1)];
  const activeStatusCancel = listStatusCancel.find((item) => item.value === order?.orderStatus);

  const calculateActiveStep = useCallback(() => {
    if (activeStatus?.step === OrderProcessStep.Four_Completed) {
      return activeStatus?.step;
    }
    if (activeStatus?.step) {
      return activeStatus?.step - 1;
    }
  }, [activeStatus]);

  const renderStep = (item: TOrderStatusOptions, index: number) => {
    return (
      <Step key={item.step}>
        <StepLabel>{index + 1}. {item.name}</StepLabel>
      </Step>
    );
  };

  return (
    <>
      <Stack flexDirection='column' width='100%' mt={5}>
        <Stack flexDirection='row' alignItems='center' gap='10px' mb={5}>
          <RocketLaunchOutlinedIcon />
          <Typography
            variant='h5'
            fontSize='1.2rem'
            fontWeight='600'
            color={theme.color.black}
          >
            Trạng thái đơn hàng
          </Typography>
        </Stack>
        {order?.orderStatus === PaymentStatus.CANCELLED ? (
          <Stepper
            sx={{ width: { md: '40%', xs: '100%' } }}
            activeStep={activeStatusCancel?.step && activeStatusCancel?.step - 1}
            alternativeLabel
          >
            {listStatusCancel.map((item, i) => renderStep(item, i))}
          </Stepper>
        ) : (
          <Stepper activeStep={calculateActiveStep()} alternativeLabel>
            {listStatus.map((item, i) => renderStep(item, i))}
          </Stepper>
        )}
      </Stack>
      <Stack
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-end'
        width='100%'
        mt={5}
        gap='10px'
      >
        <ButtonCustom
          variant='outlined'
          handleClick={() => router.back()}
          content='Quay lại'
          startIcon={<KeyboardBackspaceRoundedIcon />}
        />
        {activeStatus && activeStatus?.step < OrderProcessStep.Four_Completed && (
          <ButtonCustom
            variant='contained'
            handleClick={() => setIsOpenConfirm({ open: true, action: ActionOrderType.ChangeByStep })}
            content={`${activeStatus?.content}`}
            startIcon={<CheckRoundedIcon />}
            disabled={
              order?.paymentOrder?.method !== PaymentMethod.COD &&
              order?.paymentOrder?.status !== PaymentStatus.COMPLETED
            }
          />
        )}
        {activeStatus?.value === PaymentStatus.PENDING && (
          <ButtonCustom
            variant='contained'
            handleClick={() => setIsOpenConfirm({ open: true, action: ActionOrderType.Cancel })}
            content='Hủy đơn hàng'
            startIcon={<RemoveCircleRoundedIcon />}
          />
        )}
      </Stack>

      {isOpenConfirm.open && (
        <OrderChangeStatusConfirm
          activeStatus={activeStatus}
          listStatus={listStatus}
          handleClose={() => setIsOpenConfirm({ open: false, action: '' })}
          isOpen={isOpenConfirm.open}
          action={isOpenConfirm.action}
        />
      )}
    </>
  );
};

interface ConfirmProps extends DialogAction {
  listStatus: any,
  activeStatus: any,
  action: string
}

const OrderChangeStatusConfirm = memo((
  { listStatus, activeStatus, action, isOpen, handleClose }: ConfirmProps) => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);

  const handleStatusStepByStep = () => {
    if (activeStatus && activeStatus?.step <= 4) {
      const orderStatus = listStatus[activeStatus?.step].value;
      dispatch(editOrderStatus(String(order?._id), orderStatus))
        .then(() => handleClose());
    }
  };

  const handleRemoveOrder = () => {
    dispatch(editOrderStatus(String(order?._id), PaymentStatus.CANCELLED))
      .then(() => {
        handleClose();
      });
  };

  const renderTitle = () => {
    if (action === ActionOrderType.Cancel) {
      return 'Bạn có chắc muốn hủy đơn hàng này không?';
    } else if (action === ActionOrderType.ChangeByStep) {
      return (
        <>Bạn có chắc muốn <b>{activeStatus?.content.toLowerCase()}</b>?</>
      );
    }
  };

  return (
    <ShowDialog
      dialogTitle={'Xác nhận'}
      isOpen={isOpen}
      handleClose={handleClose}
      dialogStyle={{ maxWidth: '40%' }}
      dialogDesc={<>{renderTitle()}</>}
    >
      <ButtonCustom
        variant='outlined'
        content='Hủy bỏ'
        handleClick={handleClose}
      />
      <ButtonCustom
        variant='contained'
        content='Xác nhận'
        handleClick={action === ActionOrderType.Cancel ? handleRemoveOrder : handleStatusStepByStep}
      />
    </ShowDialog>
  );
});

export default memo(OrderProcess);

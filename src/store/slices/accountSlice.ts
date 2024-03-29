import { createSlice, Dispatch } from '@reduxjs/toolkit';
import {
  postAccount,
  getAllAccounts,
  getDetailsAccount,
  patchBlockAccount,
  patchChangeRoleAccount,
  patchUnBlockAccount,
} from '@services/accountService';
import { PagingResponse } from '@models/Common';
import { RegisterModel } from '@models/Auth';
import { AccountSlice, PagingAccount, UserAccount } from '@models/Account';
import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';

const initialState: AccountSlice = {
  accounts: new PagingResponse<UserAccount>(),
  account: null,
  isLoading: false,
  isLoadingDetails: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true;
    },
    getAllSuccess: (state, { payload }) => {
      state.accounts = payload;
      state.isLoading = false;
    },
    getDetailsSuccess: (state, { payload }) => {
      state.account = payload;
      state.isLoadingDetails = false;
    },
    getAllFailure: (state) => {
      state.accounts = new PagingResponse<UserAccount>();
      state.isLoading = false;
    },
    getDetailsFailure: (state) => {
      state.account = null;
      state.isLoading = false;
    },
    createAccountSuccess: (state) => {
      state.isLoading = false;
    },
    patchAccountSuccess: (state, { payload }) => {
      const index = state.accounts.data.findIndex((account) => account._id === payload._id);
      if (index !== -1) {
        state.accounts.data[index] = payload;
      }
      state.isLoading = false;
    },
    requestAccountFailure: (state) => {
      state.isLoading = false;
    },
  },
});

// Thunk
export const getAllUserAccount = (payload: PagingAccount) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await getAllAccounts(payload);
    if (response.data) {
      dispatch(getAllSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getAllFailure());
  }
};

export const getDetailsUserAccount = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails());
  try {
    const response = await getDetailsAccount(id);
    if (response.data) {
      dispatch(getDetailsSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getDetailsFailure());
  }
};

export const createNewAccount = (payload: RegisterModel) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await postAccount(payload);
    if (response.data) {
      dispatch(createAccountSuccess());
      toast.success('Thêm mới tài khoản thành công!');
    }
  } catch (error) {
    console.log(error);
    // @ts-ignore
    if (error?.response?.status === HttpStatusCode.UnprocessableEntity) {
      toast.error('Email đã được sử dụng! Thêm mới tài khoản thất bại!');
    } else {
      toast.error('Thêm mới tài khoản thất bại!');
    }
    dispatch(requestAccountFailure());
  }
};

export const blockAccount = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await patchBlockAccount(id);
    if (response.data) {
      dispatch(patchAccountSuccess(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(requestAccountFailure());
  }
};

export const unBlockAccount = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await patchUnBlockAccount(id);
    if (response.data) {
      dispatch(patchAccountSuccess(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(requestAccountFailure());
  }
};

export const changeRoleAccount = (id: string, role: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await patchChangeRoleAccount(id, role);
    if (response.data) {
      dispatch(patchAccountSuccess(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(requestAccountFailure());
  }
};

const { actions, reducer } = accountSlice;

export const {
  isFetching,
  isFetchingDetails,
  getAllSuccess,
  getDetailsSuccess,
  getAllFailure,
  getDetailsFailure,
  createAccountSuccess,
  patchAccountSuccess,
  requestAccountFailure,
} = actions;
export default reducer;

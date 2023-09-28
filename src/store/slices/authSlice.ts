import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { IAuthSlice, ILogin } from '@interface/auth';
import { fetchLogin } from '@services/authServices';
import { IAlert } from '@interface/common';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const initialState: IAuthSlice = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isLoading = true;
    },
    authenticatedSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

// Thunk
export const authenticate = () => async (dispatch: Dispatch) => {
  if (localStorage.getItem('user')) {
    dispatch(authenticatedSuccess());
  }
};

export const login =
  (payload: ILogin) =>
    async (dispatch: Dispatch) => {
      dispatch(isLogin());
      try {
        const response = await fetchLogin(payload);

        if (response.data.role !== 'User') {
          localStorage.setItem('user', JSON.stringify(response.data));
          dispatch(loginSuccess(response.data));
          toast.success('Đăng nhập thành công!');
        } else {
          dispatch(loginFailure());
          toast.warning('Tài khoản này có quyền đăng nhập!');
        }
      } catch (error) {
        dispatch(loginFailure());
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 406) {
            toast.warning('Vui lòng xác thực email để đăng nhập!');
            return { isVerify: false };
          } else {
            toast.error('Đăng nhập không thành công!');
          }
        }
      }
    };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('user');
  dispatch(loginFailure());
};

const { actions, reducer } = authSlice;

export const { isLogin, authenticatedSuccess, loginSuccess, loginFailure } =
  actions;
export default reducer;

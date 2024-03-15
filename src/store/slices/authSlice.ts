import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { fetchLogin } from '@services/authServices';
import { toast } from 'react-toastify';
import axios, { HttpStatusCode } from 'axios';
import { AuthSlice, LoginModel } from '@models/Auth';
import { UserAccount } from '@models/Account';
import { getProfile, patchProfileInfo } from '@services/profileService';
import { getAccessToken, getRefreshToken } from '@utils/local';
import { Roles } from '@constants/enum';

const initialState: AuthSlice = {
  user: new UserAccount(),
  isLoading: false,
  isLoadingProfile: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isLoading = true;
    },
    isLoadingProfile: (state) => {
      state.isLoadingProfile = true;
    },
    loadedProfile: (state) => {
      state.isLoading = false;
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoadingProfile = false;
      state.isAuthenticated = true;
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
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user')) {
      dispatch(authenticatedSuccess());
    }
  }
};

export const login = (payload: LoginModel) => async (dispatch: Dispatch) => {
  dispatch(isLogin());
  try {
    const response = await fetchLogin(payload);

    if (response.data.role !== Roles.User) {
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      toast.success('Đăng nhập thành công!');
    } else {
      dispatch(loginFailure());
      toast.warning('Tài khoản này không có quyền đăng nhập!');
    }
  } catch (error) {
    dispatch(loginFailure());
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 406) {
        toast.warning('Vui lòng xác thực email để đăng nhập!');
        return { isNotVerify: true };
      } else {
        toast.error('Đăng nhập không thành công!');
      }
    }
  }
};

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  dispatch(isLoadingProfile());
  try {
    const { status, data } = await getProfile();
    if (status === HttpStatusCode.Ok) {
      const extendsUser: UserAccount = {
        ...data,
        accessToken: String(getAccessToken()),
        refreshToken: String(getRefreshToken()),
      };
      localStorage.setItem('user', JSON.stringify(extendsUser));
      dispatch(getUserSuccess(extendsUser));
    }
  } catch {
    dispatch(loadedProfile());
  }
};

export const editProfileInfo = (payload: Partial<UserAccount>) => async (dispatch: Dispatch) => {
  try {
    const { status } = await patchProfileInfo(payload);
    if (status === HttpStatusCode.Ok) {
      toast.success('Cập nhật thông tin hồ sơ thành công!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
        toast.error('Cập nhật thông tin hồ sơ thất bại!');
      }
    }
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('user');
  dispatch(loginFailure());
};

const { actions, reducer } = authSlice;

export const {
  isLogin,
  getUserSuccess,
  loadedProfile,
  isLoadingProfile,
  authenticatedSuccess,
  loginSuccess,
  loginFailure,
} = actions;
export default reducer;

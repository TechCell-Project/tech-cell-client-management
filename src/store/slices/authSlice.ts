import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { fetchLogin } from '@services/authServices';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthSlice, LoginModel } from '@models/Auth';
import { UserAccount } from '@models/Account';
import { getProfile, patchProfileAddress, patchProfileInfo } from '@services/profileService';
import { ProfileAddressRequest, ProfileInfoRequest } from '@models/Profile';

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
  (payload: LoginModel) =>
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
    const response = await getProfile();
    if (response.status === 200) {
      dispatch(getUserSuccess(response.data));
    }
  } catch {
    dispatch(loadedProfile());
  }
};

export const editProfileInfo = (payload: Partial<UserAccount>) => async (dispatch: Dispatch) => {
  dispatch(isLoadingProfile());
  try {
    const response = await patchProfileInfo(payload);
    if (response.status === 200) {
      toast.success('Cập nhật thông tin hồ sơ thành công!');
      dispatch(getUserSuccess(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  } catch {
    toast.error('Cập nhật thông tin hồ sơ thất bại!');
    dispatch(loadedProfile());
  }
};

export const editProfileAddress = (payload: ProfileAddressRequest) => async (dispatch: Dispatch) => {
  dispatch(isLoadingProfile());
  try {
    const response = await patchProfileAddress(payload);
    if (response.status === 200) {
      toast.success('Cập nhật địa chỉ hồ sơ thành công!');
      dispatch(getUserSuccess(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  } catch {
    toast.error('Cập nhật địa chỉ hồ sơ thất bại!');
    dispatch(loadedProfile());
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
} =
  actions;
export default reducer;

import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { IAuthSlice, ILogin } from "@interface/auth";
import { fetchLogin } from "@services/authServices";
import { IAlert } from "@interface/common";

const initialState: IAuthSlice = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
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
  if (localStorage.getItem("user")) {
    dispatch(authenticatedSuccess());
  }
};

export const login =
  (payload: ILogin) =>
    async (dispatch: Dispatch): Promise<IAlert> => {
      dispatch(isLogin());
      try {
        const response = await fetchLogin(payload);
        
        if (response.data.role !== "User") {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(loginSuccess(response.data));
          return {
            type: "success",
            status: 1,
            message: "Bạn đã đăng nhập thành công!",
          };
        } else {
          dispatch(loginFailure());
          return {
            type: "warning",
            status: 3,
            message: "Tài khoàn của bạn không có quyền đăng nhập!",
          };
        }
      } catch (error: any) {
        dispatch(loginFailure());
        if (String(error.response.status).startsWith("4")) {
          return {
            type: "error",
            status: 2,
            message: "Tài khoàn hoặc mật khẩu không đúng!",
          };
        } else {
          return {
            type: "error",
            status: 2,
            message: "Hệ thống có lỗi xảy ra!",
          };
        }
      }
    };

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("user");
  dispatch(loginFailure());
};

const { actions, reducer } = authSlice;

export const { isLogin, authenticatedSuccess, loginSuccess, loginFailure } =
  actions;
export default reducer;

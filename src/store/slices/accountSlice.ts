import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getAllAccounts } from '@services/accountService';
import { IAccountSlice } from '@interface/auth';

const initialState: IAccountSlice = {
    accounts: [],
    account: null,
    isLoading: false,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        getAllSuccess: (state, { payload }) => {
            state.accounts = payload;
        },
        getDetailsSuccess: (state, { payload }) => {
            state.account = payload;
        },
        getFailure: (state) => {
            state.account = null;
            state.accounts = [];
        },
    },
});

// Thunk
export const getAllUserAccount = () => async (dispatch: Dispatch) => {
    try {
        const response = await getAllAccounts();
        if (response.data) {
            dispatch(getAllSuccess(response.data));
        }
    } catch (error) {
        dispatch(getFailure());
    }
};

const { actions, reducer } = accountSlice;

export const { getAllSuccess, getDetailsSuccess, getFailure } = actions;
export default reducer;

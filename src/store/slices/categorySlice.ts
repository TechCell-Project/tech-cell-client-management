import { CategoryData, CategorySlice } from "@models/Category";
import { SearchModel } from "@models/Common";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "@services/categoryService";

const initialState: CategorySlice = {
  categories: new CategoryData(),
  category: null,
  isLoading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    getAllSuccess: (state, { payload }: { payload: CategoryData }) => {
      state.categories = payload;
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.categories = new CategoryData();
      state.isLoading = false;
    },
    fetchedDone: (state) => {
      state.isLoading = false;
    },
  },
});

// Thunk
export const getAllCategory =
  (payload: SearchModel) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await getCategories(payload);
      if (response.data) {
        dispatch(getAllSuccess(response.data));
      }
    } catch (error) {
      dispatch(getAllFailure());
    }
  };

const { actions, reducer } = categorySlice;

export const { isFetching, fetchedDone, getAllSuccess, getAllFailure } =
  actions;
export default reducer;

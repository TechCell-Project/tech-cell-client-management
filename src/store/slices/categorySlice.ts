import { CategoryData, CategoryModel, CategorySlice } from "@models/Category";
import { SearchModel } from "@models/Common";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  editCategoryById,
  getCategories,
  getCategoryByLabel,
} from "@services/categoryService";

const initialState: CategorySlice = {
  categories: new CategoryData(),
  category: null,
  isLoading: false,
  isLoadingDetails: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true;
    },
    getAllSuccess: (state, { payload }) => {
      state.categories = payload;
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.categories = new CategoryData();
      state.isLoading = false;
    },
    getDetailsSuccess: (state, { payload }) => {
      state.category = payload;
      state.isLoadingDetails = false;
    },
    getDetailsFailure: (state) => {
      state.category = null;
      state.isLoadingDetails = false;
    },
    editSuccess: (state, { payload }) => {
      const index = state.categories.data.findIndex(
        (category) => category._id === payload._id
      );
      if (index !== -1) {
        state.categories.data[index] = payload;
      }
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

export const createNewCategory =
  (payload: CategoryModel) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      await createCategory(payload);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(fetchedDone());
    }
  };

export const getDetailsCategoryByLabel =
  (label: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
      const response = await getCategoryByLabel(label);
      if (response.data) {
        dispatch(getDetailsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getDetailsFailure());
    }
  };

export const editCategory = (payload: CategoryModel, id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await editCategoryById(payload, id);
    if (response.data) {
      dispatch(editSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(fetchedDone());
  }
} 

const { actions, reducer } = categorySlice;

export const {
  isFetching,
  isFetchingDetails,
  getDetailsFailure,
  getDetailsSuccess,
  fetchedDone,
  getAllSuccess,
  getAllFailure,
  editSuccess,
} = actions;
export default reducer;

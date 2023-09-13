import {
  PagingProduct,
  ProductData,
  ProductRequest,
  ProductSlice,
} from "@models/Product";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  getProductById,
  getProducts,
  postProduct,
} from "@services/productService";

const initialState: ProductSlice = {
  products: new ProductData(),
  product: null,
  isLoading: false,
  isLoadingDetails: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true;
    },
    getAllSuccess: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.products = new ProductData();
      state.isLoading = false;
    },
    getDetailsSuccess: (state, { payload }) => {
      state.product = payload;
      state.isLoadingDetails = false;
    },
    getDetailsFailure: (state) => {
      state.product = null;
      state.isLoadingDetails = false;
    },
    fetchedDone: (state) => {
      state.isLoading = false;
    },
  },
});

//Thunk
export const getAllProduct =
  (payload: PagingProduct) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await getProducts(payload);
      if (response.data) {
        dispatch(getAllSuccess(response.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(getAllFailure());
    }
  };

export const getDetailsProduct = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await getProductById(id);
    if (response.data) {
      dispatch(getDetailsSuccess(response.data));
    }
  } catch (error) {
    dispatch(getDetailsFailure());
  }
};

export const createNewProduct =
  (payload: ProductRequest) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await postProduct(payload);
      if (response.data) {
        return { success: true };
      }
    } catch (error) {
      return { success: false, error };
    } finally {
      dispatch(fetchedDone());
    }
  };

const { actions, reducer } = productSlice;

export const {
  isFetching,
  fetchedDone,
  getAllSuccess,
  getAllFailure,
  isFetchingDetails,
  getDetailsSuccess,
  getDetailsFailure,
} = actions;
export default reducer;

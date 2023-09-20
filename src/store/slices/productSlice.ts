import {
  PagingProduct,
  ProductData,
  ProductModel,
  ProductRequest,
  ProductSlice,
} from '@models/Product';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getProductById, getProducts, postProduct, putProduct } from '@services/productService';

const initialState: ProductSlice = {
  products: new ProductData(),
  product: null,
  isLoading: false,
  isLoadingDetails: false,
};

export const productSlice = createSlice({
  name: 'product',
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
    editSuccess: (state, { payload }) => {
      const index = state.products.data.findIndex((product) => product._id === payload._id);
      if (index !== -1) {
        state.products.data[index] = payload;
      }
      state.isLoadingDetails = false;
    },
    fetchedDone: (state) => {
      state.isLoading = false;
    },
    fetchedDetailsDone: (state) => {
      state.isLoadingDetails = false;
    },
  },
});

//Thunk
export const getAllProduct = (payload: PagingProduct) => async (dispatch: Dispatch) => {
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
  dispatch(isFetchingDetails());
  try {
    const response = await getProductById(id);
    if (response.data) {
      dispatch(getDetailsSuccess(response.data));
    }
  } catch (error) {
    dispatch(getDetailsFailure());
  }
};

export const createNewProduct = (payload: ProductRequest) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails());
  try {
    const response = await postProduct(payload);
    if (response.data) {
      return { success: true };
    }
  } catch (error) {
    return { success: false, error };
  } finally {
    dispatch(fetchedDetailsDone());
  }
};

export const editProduct = (payload: ProductModel, id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails());
  try {
    const response = await putProduct(payload, id);
    if (response.data) {
      dispatch(editSuccess(response.data));
      return { success: true };
    }
  } catch (error) {
    return { success: false, error };
  } finally {
    dispatch(fetchedDetailsDone());
  }
};

const { actions, reducer } = productSlice;

export const {
  isFetching,
  fetchedDone,
  fetchedDetailsDone,
  getAllSuccess,
  getAllFailure,
  isFetchingDetails,
  getDetailsSuccess,
  getDetailsFailure,
  editSuccess,
} = actions;
export default reducer;

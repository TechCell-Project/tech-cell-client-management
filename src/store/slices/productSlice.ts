import { ProductSlice } from "@interface/product";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getProducts } from "@services/productService";

const initialState: ProductSlice = {
  products: [],
  product: null,
  isLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    isFetching: (state) => {
    state.isLoading = true;
    },
    getAllSuccess: (state, { payload }) => {
      state.products = payload;
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.products = [];
      state.isLoading = false;
    }
  },
});

//Thunk
export const getAllProduct = () => async (dispatch: Dispatch) => {
  try {
    const response = await getProducts();
    if(response.data) {
      dispatch(getAllSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getAllFailure());
  }
};

const { actions, reducer } = productSlice;

export const { isFetching, getAllSuccess, getAllFailure } = actions;
export default reducer;

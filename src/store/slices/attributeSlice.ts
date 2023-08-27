import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  AttributeModel,
  AttributeSlice,
  CreateAttributeModel,
  SearchAttributeModel,
  AttributeData,
} from "@models/Attribute";
import {
  deleteAttribute,
  getAttributes,
  getByIdAttribute,
  patchAttribute,
  postAttribute,
} from "@services/attributeService";

const initialState: AttributeSlice = {
  attributes: new AttributeData(),
  attribute: null,
  isLoading: false,
  isLoadingDetail: false,
};

export const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    isFetchingDetail: (state) => {
      state.isLoadingDetail = true;
    },
    getAllSuccess: (state, { payload }) => {
      state.attributes = payload;
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.attributes = new AttributeData();
      state.isLoading = false;
    },
    getDetailsSuccess: (state, { payload }: { payload: AttributeModel }) => {
      state.attribute = payload;
      state.isLoadingDetail = false;
    },
    getDetailsFailure: (state) => {
      state.attribute = null;
      state.isLoadingDetail = false;
    },
    editSuccess: (state, { payload }: { payload: AttributeModel }) => {
      const index = state.attributes.data.findIndex(
        (attribute) => attribute._id === payload._id
      );
      if (index !== -1) {
        state.attributes.data[index] = payload;
      }
      state.isLoading = false;
    },
    deleteSuccess: (state, { payload }: { payload: string }) => {
      state.attributes.data = state.attributes.data.filter(
        (attribute) => attribute._id !== payload
      );
      state.isLoading = false;
    },
    fetchedDone: (state) => {
      state.isLoading = false;
    },
  },
});

// Thunk
export const getAllAttributes =
  (payload: SearchAttributeModel) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await getAttributes(payload);
      if (response.data) {
        dispatch(getAllSuccess(response.data));
      }
    } catch (error) {
      dispatch(getAllFailure());
    }
  };

export const getDetailAttributeById =
  (id: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetail());
    try {
      const response = await getByIdAttribute(id);
      if (response.data) {
        dispatch(getDetailsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getDetailsFailure());
    }
  };

export const createNewAttribute =
  (payload: CreateAttributeModel) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await postAttribute(payload);
      if (response.data) {
        dispatch(fetchedDone());
        return { success: true };
      }
    } catch (error) {
      dispatch(fetchedDone());
      return { success: false, error };
    }
  };

export const editAttribute =
  (payload: CreateAttributeModel, id: string) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const response = await patchAttribute(payload, id);
      if (response.data) {
        dispatch(editSuccess(response.data));
        return { success: true };
      }
    } catch (error) {
      dispatch(fetchedDone());
      return { success: false, error };
    }
  };

export const removeAttribute = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const response = await deleteAttribute(id);
    if (response.data) {
      dispatch(deleteSuccess(id));
      return { success: true };
    }
  } catch (error) {
    dispatch(fetchedDone());
    return { success: false, error };
  }
};

const { actions, reducer } = attributeSlice;

export const {
  isFetching,
  isFetchingDetail,
  getAllFailure,
  getAllSuccess,
  getDetailsFailure,
  getDetailsSuccess,
  editSuccess,
  deleteSuccess,
  fetchedDone,
} = actions;
export default reducer;

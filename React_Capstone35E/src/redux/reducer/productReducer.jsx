import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import axios from "axios";
import _ from "lodash";
const initialState = {
  //index
  arrProduct: [],
  //detail
  productDetail: null,
  productQuantity: 1,
  productSize: null,

  productStore: null,
  //search
  arrSearch: [],
  sort: "",
  //cart
  arrStore: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    //index
    getProductAction: (state, action) => {
      // nhan action.payload vao state.arrProduct
      state.arrProduct = action.payload;
    },
    //detail
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    // lay size giay
    getSizeProductAction: (state, action) => {
      state.productSize = action.payload;
    },
    // lay so luong
    getQuatityProductAction: (state, action) => {
      if (state.productQuantity <= 1) {
        state.productQuantity += 1;
      }
      state.productQuantity += action.payload;
    },
    //search
    getProductByKeyWordAction: (state, action) => {
      state.arrSearch = action.payload;
    },
    getFillterProductAction: (state, action) => {
      // set lai value cho sort
      state.sort = action.payload;
      // check gia tri "asc" and "desc" dung _.orderBy tu libary lodash de filter Ascending and Decrease gan array da filter vao arrSearch
      if (state.sort === "asc") {
        state.arrSearch = _.orderBy(
          state.arrSearch,
          [(item) => item.price],
          ["asc"]
        );
      } else if (state.sort === "desc") {
        state.arrSearch = _.orderBy(
          state.arrSearch,
          [(item) => item.price],
          ["desc"]
        );
      } else {
        return state.arrSearch;
      }
    },
    //them product vao cart
    getAddProductStoreAction: (state, action) => {
      if (!state.productSize) {
        alert("Xin chọn size giày phù hợp");
        return;
      }
      const productCheck = state.arrStore.find(
        (item) => item.id === action.payload.id
      );
      if (productCheck) {
        productCheck.quantity += action.payload.quantity;
      } else {
        state.arrStore.push(action.payload);
      }
    },
    //cart
    // thay doi so luong trong cart
    changeQuantityCartAction: (state, action) => {
      const { id, quantity } = action.payload;
      const productCheck = state.arrStore.find((item) => item.id === id);
      if (productCheck) {
        if (productCheck.quantity <= 1) {
          productCheck.quantity += 1;
        }
        productCheck.quantity += quantity;
      }
    },
    // delete product trong cart
    deleteProductCartAction: (state, action) => {
      state.arrStore = state.arrStore.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  getProductAction,
  getProductDetailAction,
  getProductByKeyWordAction,
  getFillterProductAction,
  getSizeProductAction,
  getQuatityProductAction,
  getAddProductStoreAction,
  changeQuantityCartAction,
  deleteProductCartAction,
} = productReducer.actions;

export default productReducer.reducer;

/* async function */
// lay san pham tu api ve
export const getAllProductApi = () => {
  return async (dispatch) => {
    // const result = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Product",
    //   method: "GET",
    // });
    const result = await http.get("/api/Product");
    const action = getProductAction(result.data.content);

    dispatch(action);
  };
};
// lay san pham qua id trong trang detail
export const getProductByIdApi = (id) => {
  return async (dispatch) => {
    // const result = await axios({
    //   url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    //   method: "GET",
    // });
    const result = await http.get(`/api/Product/getbyid?id=${id}`);

    const action = getProductDetailAction(result.data.content);

    dispatch(action);
  };
};
// lay san pham qua keyword trong trang search
export const getProductByKeyWordApi = (keyword) => {
  return async (dispatch) => {
    //nếu keyword khác null => call api
    if (keyword) {
      // const result = await axios({
      //   url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
      //   method: "GET",
      // });
      const result = await http.get(`/api/Product?keyword=${keyword}`);

      //Sau khi call api dựa vào từ khoá thành công thì dispatch len reducer
      const action = getProductByKeyWordAction(result.data.content);

      dispatch(action);
    }
  };
};

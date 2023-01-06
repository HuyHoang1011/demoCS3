import axios from "axios";
import { history } from '../../index';
import { createSlice } from "@reduxjs/toolkit";
import {getStore,http,saveStoreJson, USER_LOGIN} from '../../util/config';
const initialState = {
  userRegister: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      state.newUser = action.payload;
  },
  getProfileAction: (state, action) => {
      state.profile = action.payload;
  },
  postUpdateProfileApi: (state, action) => {
      state.profile = action.payload;
  },
  getProductFavoriteAction: (state, action) => {
      state.productFavorite = action.payload;
  },  
  }
  ,
});

export const {setNewUser, getProfileAction, postUpdateProfileApi, getProductFavoriteAction} = userReducer.actions;

export default userReducer.reducer;


/**=========== async action ================= */
//lay thong tin nguoi dang ky
export const registerApi = (infoUse) => {  // { "email": "", "password": "",  "name": "",  "gender": true, "phone": "" }
  return async dispatch => {
      let result = await http.post('/api/Users/signup', infoUse);
      console.log('result', result.data);
      const action = setNewUser(result.data.content);
      dispatch(action);
      alert('đăng kí thành công');
      history.push('/login');
  }
}
//gui thong tin len api de dang nhap
export const loginApi = (userLogin) => {
  return async () => {
      let result = await http.post(`/api/Users/signin`, userLogin);
      saveStoreJson(USER_LOGIN, result.data.content);
      // alert('đăng nhập thành công')
      window.location.reload();
      // history.push('/profile');
      //Luu cookie hoac localstorage cho token
      //luu thong tin dang nhap thanh cong {email,accessToken} vao localstorage
      //luu access token vao cookie
      // setCookie(TOKEN_CYBER,result.data.content.accessToken);
  }
}

//lay thong tin user profile
export const getProfileApi = async (dispatch) => {
  if (!getStore()) return;
  // console.log(getStore());
  let result = await http.post('/api/Users/getProfile');
  //sau khi call api profile dua len reducer
  const action = getProfileAction(result.data.content);
  dispatch(action);
  // console.log(result.data.content);
}

//cap nhat thong tin user
export const updateProfileApi = (profileUpdate) => {
  return async (dispatch) => {
      try {
          await http.post('/api/Users/updateProfile', profileUpdate);
          alert("update thành công")
      } catch (error) {
          console.log(error);
      } finally {
          dispatch(getProfileApi);
      }
  }

}
///
//dang nhap bang facebook
export const loginFacebookApi = (fbToken) => {
  try {
      return async () => {
          const result = await http.post("/api/Users/facebooklogin", fbToken);
          console.log(result.data.content);
          // alert('đăng nhập thành công')
          window.location.reload();
          history.push('/profile');
          saveStoreJson(USER_LOGIN, result.data.content);
      }
  } catch (error) {
      console.log({ error });
  }
}
//xoa san pham order
export const deteleOrderApi = (id) => {
  try {
      return async () => {
          const result = await http.post("/api/Users/deleteOrder", id);
          console.log(result);
          window.location.reload();
      }
  } catch (error) {
      console.log(error);
  }
}

//like product
export const likeApi = (id) => {
  try {
      return async () => {
          const result = await http.get(`/api/Users/like?productId=${id}`);
          console.log('like', result.data.content);
      }
  } catch (error) {
      console.log(error);
  }
}
//unlike
export const unlikeApi = (id) => {
  try {
      return async () => {
          const result = await http.get(`/api/Users/unlike?productId=${id}`);
          console.log('unlike', result.data.content);
      }
  } catch (error) {
      console.log(error);
  }
}
//product favorite
export const getProductFavoriteApi = () => {
  try {
      return async (dispatch) => {
          const result = await http.get("/api/Users/getproductfavorite");
          console.log(result.data.content);
          const action = getProductFavoriteAction(result.data.content);
          dispatch(action);
      }
  } catch (error) {
      console.log(error);
  }
}
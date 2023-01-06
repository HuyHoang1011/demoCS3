import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoesCard from "../../components/ShoesCard/ShoesCard";
import {
  getFillterProductAction,
  getProductByKeyWordApi,
} from "../../redux/reducer/productReducer";
import _ from "lodash";

const Search = () => {
  const { arrSearch } = useSelector((state) => state.productReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("k"); //khi đường dẫn url không có tham số keyword => null
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      //values.keyword = 'abc'

      //Khi người dùng gõ từ khoá và submit => đưa từ khoá lên url
      setSearchParams({
        k: values.keyword,
      });
    },
  });
  console.log(arrSearch);
  const getProductSearch = () => {
    // gui keyword len async function
    const action = getProductByKeyWordApi(keyword);
    dispatch(action);
  };
  useEffect(() => {
    //call api
    getProductSearch();
  }, [keyword]);
  // render ra product searh result
  const renderProduct = () => {
    return arrSearch.map((item) => {
      return (
        <div className="col-6 col-md-3 col-lg-2 mb-md-4 mb-4" key={item.id}>
          <ShoesCard prod={item} />
        </div>
      );
    });
  };

  return (
    <div className="container search">
      <h2>Search</h2>
      <form action="" className="search-form" onSubmit={frm.handleSubmit}>
        <input
          type="text"
          className="search-input"
          name="keyword"
          onChange={frm.handleChange}
        />
        <button type="submit" className="search-btn  ">
          Search
        </button>
      </form>
      <div className="search-result mt-2">
        <h2 className="text-center">Search Result</h2>
        <div>
          <h3>Price</h3>
          <select
            name="price"
            onChange={(e) => {
              const action = getFillterProductAction(e.target.value);
              dispatch(action);
            }}
          >
            <option value="">Option</option>
            <option value="asc">Ascending</option>
            <option value="desc">Decrease</option>
          </select>
        </div>
        <div className="row   mt-2">{renderProduct()}</div>
      </div>
    </div>
  );
};

export default Search;

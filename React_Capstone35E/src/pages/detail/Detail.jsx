import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  getAddProductStoreAction,
  getProductByIdApi,
  getQuatityProductAction,
  getSizeProductAction,
} from "../../redux/reducer/productReducer";
import ShoesCard from "../../components/ShoesCard/ShoesCard";

const Detail = () => {
  // lấy productdetail từ productReducer
  const { productDetail, productQuantity, productSize } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  // lấy param
  const param = useParams();

  const getProductById = () => {
    // lấy api
    const action = getProductByIdApi(param.id);
    dispatch(action);
  };
  //call api theo id để lấy productdetail về reducer
  useEffect(() => {
    getProductById();
  }, [param.id]);
  const renderButton = () => {
    return productDetail?.size.map((item) => {
      return (
        <button
          key={item}
          className={productSize === item ? "actived" : ""}
          onClick={() => {
            const action = getSizeProductAction(item);
            dispatch(action);
          }}
        >
          {item}
        </button>
      );
    });
  };
  return (
    <section className="detail">
      <div className="product__detail container">
        <div className="row product__detail-item">
          <div className="col-lg-4">
            <img src={productDetail?.image} className="w-100" alt="..." />
          </div>
          <div className="col-lg-8 product__item-info">
            <h3>{productDetail?.name}</h3>
            <p>{productDetail?.description}</p>
            <p>Available size</p>
            <div className="product__item-btn">{renderButton()}</div>
            <p>{productDetail?.price}$</p>
            <div className="product__item-btn-quantity">
              <button
                onClick={() => {
                  const action = getQuatityProductAction(1);
                  dispatch(action);
                }}
              >
                +
              </button>
              <span>{productQuantity}</span>
              <button
                onClick={() => {
                  const action = getQuatityProductAction(-1);
                  dispatch(action);
                }}
              >
                -
              </button>
            </div>
            <button
              className="btn product__item-btn-cart"
              onClick={() => {
                const itemCart = {
                  ...productDetail,
                  quantity: productQuantity,
                  size: productSize,
                };
                const action = getAddProductStoreAction(itemCart);
                dispatch(action);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="realate-product container mt-3">
        <h2 className="text-center mb-3">Realate Product</h2>
        <div className="row">
          {productDetail?.relatedProducts.map((item) => {
            return (
              <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                <ShoesCard prod={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Detail;

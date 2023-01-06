import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityCartAction,
  deleteProductCartAction,
} from "../../redux/reducer/productReducer";

const Carts = () => {
  const { arrStore } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const subTotal = () => {
    return arrStore.reduce((tt, current) => {
      return tt + current.price * current.quantity;
    }, 0);
  };
  return (
    <div className="container cart">
      <h2 className=" text-center">Cart</h2>
      <table className=" table__cart ">
        <thead className=" table__head">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table__body">
          {arrStore.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img src={item?.image} alt="" />
                </td>
                <td>
                  <span>
                    {item?.name}-size{item?.size}
                  </span>
                </td>
                <td>
                  <span>{item?.price}</span>
                </td>
                <td className="table__body-btn">
                  <button
                    onClick={() => {
                      const itemCart = {
                        id: item.id,
                        quantity: 1,
                      };
                      const action = changeQuantityCartAction(itemCart);
                      dispatch(action);
                    }}
                  >
                    +
                  </button>
                  <span>{item?.quantity}</span>
                  <button
                    onClick={() => {
                      const itemCart = {
                        id: item.id,
                        quantity: -1,
                      };
                      const action = changeQuantityCartAction(itemCart);
                      dispatch(action);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <span>{item?.quantity * item?.price}</span>
                </td>
                <td>
                  <span
                    className="table__btn-delete"
                    onClick={() => {
                      const action = deleteProductCartAction(item.id);
                      dispatch(action);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table__footer">
          <tr>
            <td colSpan={3}>
              <span>Subtotal:{subTotal()}$</span>
            </td>

            <td colSpan={3}>
              <button className="table__btn-submit">SUBMIT ORDER</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Carts;

import React from "react";
import { NavLink } from "react-router-dom";

const ShoesCard = ({ prod }) => {
  return (
    <div className="card shoes__card">
      <img src={prod?.image} className="w-100" alt="" />
      <div className="shoes__card-body">
        <h3>
          {prod?.name.length > 20
            ? prod?.name.slice(0, 20) + "..."
            : prod?.name}
        </h3>
        <p>
          {prod?.shortDescription.length > 35
            ? prod?.shortDescription.slice(0, 35) + "..."
            : prod?.shortDescription}
        </p>
        <div className="d-flex  shoes__card-footer">
          <NavLink to={`/detail/${prod?.id}`} className="w-50">
            View detail
          </NavLink>
          <p className="w-50 m-0 text-center ">{prod?.price}$</p>
        </div>
      </div>
    </div>
  );
};

export default ShoesCard;

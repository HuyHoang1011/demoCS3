import React, { useEffect } from "react";
import { Carousel } from "antd";
import ShoesCard from "../../components/ShoesCard/ShoesCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductApi } from "../../redux/reducer/productReducer";
import { NavLink } from "react-router-dom";

const Home = () => {
  // lay arrProduct tu reducer
  const { arrProduct } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  // lay api Product tu backend
  const getAllProduct = async () => {
    // chay getAllProductApi de lay API
    const action = getAllProductApi();
    // thuc hien ham getAllProductApi gui len reducer
    dispatch(action);
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div className=" home">
      <Carousel effect={"scroll"} autoplay={true}>
        {arrProduct.slice(0, 4).map((item, index) => {
          return (
            <div className="carousel" key={item.id}>
              <div className="carousel-item">
                <div className="w-35">
                  <img
                    src={item?.image}
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                    alt="..."
                  />
                </div>
                <div className="w-65">
                  <h2>{item?.name}</h2>
                  <p>{item?.description}</p>
                  <NavLink
                    to={`/detail/${item?.id}`}
                    className="btn btn-warning"
                  >
                    Buy now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className=" container mt-2 g-0 home__feature">
        <h3 className="text-center mb-3 home__feature-title">
          Product Feature{" "}
        </h3>
        <div className="row ">
          {arrProduct.map((prod) => {
            return (
              <div className="col-6 col-md-3 col-lg-2 mb-4" key={prod.id}>
                <ShoesCard prod={prod} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

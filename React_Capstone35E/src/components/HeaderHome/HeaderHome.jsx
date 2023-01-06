import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const HeaderHome = () => {
  const { arrStore } = useSelector((state) => state.productReducer);
  // render quantity len gio hang khi nguoi dung add to cart

  const renderQuantity = () => {
    const arr = arrStore.reduce((tt, current) => {
      return tt + current.quantity;
    }, 0);
    return arr;
  };
  return (
    <header>
      <div className="header py-2">
        <div className="header-top container">
          <NavLink to="/home" className="header-top__logo">
            <img src="/img/c255c800e61e47ec7698ffdc99e50a95.png" alt="..." />
          </NavLink>
          <div className="header-top__user">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive
                  ? "header-user__item user__actived "
                  : "header-user__item"
              }
            >
              <i className="fa-solid fa-magnifying-glass "></i>
              <span className="ms-1">Search</span>
            </NavLink>
            <NavLink
              to="/carts"
              className={({ isActive }) =>
                isActive
                  ? "header-user__item user__actived "
                  : "header-user__item"
              }
            >
              <i className="fa-solid fa-cart-shopping"></i>

              <span>({renderQuantity() > 0 ? renderQuantity() : 0}) </span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "header-user__item user__actived "
                  : "header-user__item"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "header-user__item user__actived "
                  : "header-user__item"
              }
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
      <nav className="container py-2">
        <ul className="header-menu">
          <li>
            <NavLink
              to="home"
              className={({ isActive }) => (isActive ? "actived" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              // className={({ isActive }) => (isActive ? "actived" : "")}
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              // className={({ isActive }) => (isActive ? "actived" : "")}
            >
              Woman
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              // className={({ isActive }) => (isActive ? "actived" : "")}
            >
              Kid
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              // className={({ isActive }) => (isActive ? "actived" : "")}
            >
              Sport
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderHome;

import React from "react";
import { NavLink } from "react-router-dom";

const FooterHome = () => {
  return (
    <footer>
      <div className="container footer-list">
        <div className="row ">
          <div className=" col-12 col-md-4">
            <h3>GET HELP</h3>
            <ul>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "activedfooter " : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Nike
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Adias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className=" col-12 col-md-4">
            <h3>SUPPORT</h3>
            <ul>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  // className={({ isActive }) =>
                  //   isActive ? "activedfooter " : ""
                  // }
                >
                  Phone
                </NavLink>
              </li>
            </ul>
          </div>
          <div className=" col-12 col-md-4">
            <h3>Register</h3>
            <ul>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "activedfooter " : ""
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "activedfooter " : ""
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container text-center ">
          © 2022 Cybersoft All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;

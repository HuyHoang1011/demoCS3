import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../components/FooterHome/FooterHome";
import HeaderHome from "../components/HeaderHome/HeaderHome";
const HomeTemplate = () => {
  return (
    <>
      <HeaderHome />

      <section
        className="py-5 "
        style={{ backgroundColor: "rgba(153, 153, 153, 0.1)" }}
      >
        <Outlet />
      </section>
      <FooterHome />
    </>
  );
};

export default HomeTemplate;

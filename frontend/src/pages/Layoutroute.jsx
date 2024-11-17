import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layoutroute = () => {
  const location = useLocation();
  const shouldShowFooter = !(
    location.pathname === "/SignInPage" || location.pathname === "/SignUpPage"
  );
  return (
    <>
      <Navbar />
      <Outlet />
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Layoutroute;

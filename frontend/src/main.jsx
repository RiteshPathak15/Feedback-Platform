import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import How_it_Work from "./pages/How_it_Work";
import ErrorPage from "./pages/ErrorPage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";
import LayoutRoute from "./pages/Layoutroute";
import Contact from "./pages/Contact";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import About from "./pages/About";
import Products from "./pages/Products";
import UploadProduct from "./pages/UploadProduct";
import ProfileInformation from "./pages/ProfileInformation";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutRoute />}>
      <Route index element={<Home />} />
      <Route path="How_it_Work" element={<How_it_Work />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="SignUpPage" element={<SignUpPage />} />
      <Route path="SignInPage" element={<SignInPage />} />
      <Route path="Products" element={<Products />} />
      <Route path="UploadProduct" element={<UploadProduct />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="ProfileInformation" element={<ProfileInformation />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

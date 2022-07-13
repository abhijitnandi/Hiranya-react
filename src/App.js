import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import ProductList from "./components/ProductList";
import CmsPage from "./components/CmsPage";
import ProductDetails from "./components/ProductDetails";
import Kyc from "./components/Kyc";
import OurTeam from "./components/OurTeam";
import OurCustomer from "./components/OurCustomer";
import ProductFreshCollection from "./components/ProductFreshCollection";

export default class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter basename='/dev/hiranya_web'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-details/:slug" element={<BlogDetails />} />
          <Route path="product" element={<ProductList />} />
          <Route path="fresh-collection" element={<ProductFreshCollection />} />
          <Route path="product-details/:slug" element={<ProductDetails />} />
          <Route path="Kyc" element={<Kyc />} />
          <Route path="our-team" element={<OurTeam />} />
          <Route path="our-customer" element={<OurCustomer />} />
          <Route path="/:slug" element={<CmsPage />} />
          
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

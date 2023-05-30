import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, Register } from "../../layouts";
import { Header, Home } from "../../components";
import { useDispatch, useSelector } from "react-redux";

const HandlerRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      <BrowserRouter>
        <Header user={user} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export default HandlerRoutes;

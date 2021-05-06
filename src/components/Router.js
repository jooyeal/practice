import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../routes/Home/Home";
import Result from "../routes/Result";

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/result" exact component={Result} />
    </BrowserRouter>
  );
};

export default Router;

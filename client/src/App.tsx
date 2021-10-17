import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing/index";
import { Layout } from "./components/Layout";
import { SignupPage } from "./pages/signup";

const NoMatch = () => <div>This page is not available</div>;

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          render={() => <Layout Component={LandingPage} />}
        />
        <Route
          exact
          path='/landing'
          render={() => <Layout Component={LandingPage} />}
        />
        <Route
          exact
          path='/signup'
          render={() => <Layout Component={SignupPage} />}
        />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

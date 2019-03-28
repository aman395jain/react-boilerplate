import React from "react";
import { Switch, Route } from "react-router-dom";
import UserManagement from "./components/user/dashboard/dashboard";
import { LoginPage } from "./components/login/login-page/loginPage";
import { HomePage } from "./components/HomePage/HomePage";
import Header from "./shared/header/header";
import RegisterForm from "./components/login/sign-up/signUp";
import ResetPassword from "./components/login/login-page/resetPassword";
import UserProfile from "./components/user/user-profile/userProfile";
import CarManagement from "./components/car/car-management/carManagement";
import CarDetail from "./components/car/car-management/carDetail";
import { PrivateRoute } from "./containers/PrivateRoute";
import { PageNotFound } from "./shared/error/PageNotFound";
import SearchBar from "./shared/searchBar/searchBar";
// import RegisterNew from "./components/user/user-registration-new";

const Router = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <PrivateRoute exact path="/resetPassword" component={ResetPassword} />
    <PrivateRoute exact path="/HomePage" component={HomePage} />
    <PrivateRoute exact path="/signup" component={RegisterForm} />
    <PrivateRoute exact path="/userManagement" component={UserManagement} />
    <PrivateRoute exact path="/header" component={Header} />
    <PrivateRoute exact path="/userProfile" component={UserProfile} />
    <PrivateRoute exact path="/carManagement" component={CarManagement} />
    <PrivateRoute exact path="/carDetails/:incidentId" component={CarDetail} />
    <PrivateRoute exact path="/searchBar" component={SearchBar} />
    <Route component={PageNotFound} />
    {/* <Route exact path="/registerNew" component={RegisterNew} /> */}
  </Switch>
);

export default Router;

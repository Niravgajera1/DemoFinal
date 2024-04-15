"use client";
import React from "react";
import SignInForm from "../components/SingInForm";
import { Provider } from "react-redux";
import store from "../Redux/store";

const SigninPage = () => {
  return (
    <div>
      <Provider store={store}>
        <SignInForm />
      </Provider>
    </div>
  );
};

export default SigninPage;

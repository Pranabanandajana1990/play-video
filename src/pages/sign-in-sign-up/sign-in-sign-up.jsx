import React from "react";
import "./sign-in-sign-up.scss";
import SignIn from "../../components/signin/signin";
import SignUp from "../../components/signup/signup.component";

const SignInSignUp = (props) => (
  <div className="sign-in-and-sign-up">
    <div className="colum">
      <SignIn />
    </div>
    <div className="colum">
      <SignUp />
    </div>
  </div>
);

export default SignInSignUp;

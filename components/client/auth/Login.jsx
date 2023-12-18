import { useRouter } from "next/router";
import React, { useState } from "react";

import Joi from "joi-browser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import validation from "../../utils/helpers/validation.js";

import {
  GeneralPasswordInput,
  GeneralTextInput,
} from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import {
  GetCustomerProfile,
  SendAuthorizationRequest,
} from "../../utils/hooks/customerAuth";
export default function Login() {
  const cookie = new Cookies();
  const router = useRouter();
  //form states
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //defined validation schema
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      LoginRequest(formData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (data) => {
    GetCustomerProfile(data?.data?.result);
  };

  const onError = (error) => {
    console.log("error: ", error?.message);
  };

  const {
    mutate: LoginRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = SendAuthorizationRequest(onSuccess, onError);

  //toggle password show
  const togglePasswordShow = () => {
    setShowPass(!showPass);
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <>
      <div className={"clientAuthBg"}>
        <div className={"authForm"}>
          <div className={"authFormHeader"}>
            <FaUserAlt size={20} />
            <h4>
              {isLoading ? (
                "Logging you in..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Login successful... Confirming your info, won't be long.."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Login"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <GeneralTextInput
              label={"Email"}
              placeholder={"Please enter your email"}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation-contrast">
              {errors.email && "A vaild email is required"}
            </small>{" "}
            <GeneralPasswordInput
              label={"Password"}
              placeholder={"Please enter your password"}
              id={"password"}
              name={"password"}
              showPassword={showPass}
              togglePasswordShow={togglePasswordShow}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation-contrast">
              {errors.password && "A vaild password is required"}
            </small>
            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Login"}
            </button>
            <Link href={"/auth/forgot-password"} className={"pageLink"}>
              Forgot Password
            </Link>
            <Link href={"/auth/signup"} className={"pageLink"}>
              {" Don't "}have an account? Sign up here...
            </Link>
          </form>
        </div>
        <div className={"PageNotice"}></div>
      </div>
    </>
  );
}

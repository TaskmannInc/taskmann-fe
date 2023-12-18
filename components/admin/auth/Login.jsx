import React, { useState } from "react";

import Joi from "joi-browser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import styles from "../../../styles/admin/Auth.module.css";
import validation from "../../utils/helpers/validation.js";

import { useRouter } from "next/router";
import {
  GeneralPasswordInput,
  GeneralTextInput,
} from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import {
  GetStaffProfile,
  SendStaffAuthorizationRequest,
} from "../../utils/hooks/adminAuth";
export default function AdminLoginScreen() {
  const router = useRouter();
  const cookie = new Cookies();
  const ACCESS_TOKEN = cookie.get("TM_ST_TOK");
  var baseURL = process.env.NEXT_PUBLIC_APP_URL;

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
    GetStaffProfile(data?.data?.result);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: LoginRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = SendStaffAuthorizationRequest(onSuccess, onError);

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
      <div className={"adminAuthBg"}>
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
                    "Login was successful. Confirming your information to redirect to your dashboard..."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Staff log In"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <GeneralTextInput
              label={"Email / Username"}
              placeholder={"Please enter your staff e-mail address"}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation">
              {errors.email && "A vaild email is required"}
            </small>{" "}
            <GeneralPasswordInput
              label={"Password"}
              placeholder={"Please enter your staff password"}
              id={"password"}
              name={"password"}
              showPassword={showPass}
              togglePasswordShow={togglePasswordShow}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation">
              {errors.password && "A vaild password is required"}
            </small>
            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Login"}
            </button>
            <Link
              href={"/admin/auth/forgot-password"}
              className={"pageLink"}
              style={{ margin: "1rem 0" }}
              disabled={isLoading}
            >
              Forgot Password
            </Link>
            <Link
              href={"/admin/auth/onboarding"}
              className={"pageLink"}
              disabled={isLoading}
              style={{
                padding: "0.5rem 0.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--gray)",
              }}
            >
              Get onboarded for access
            </Link>
          </form>
        </div>
        <div className={styles.PageNotice}></div>
      </div>
    </>
  );
}

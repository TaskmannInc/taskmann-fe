import React, { useState } from "react";
import { useRouter } from "next/router";
import Joi from "joi-browser";
import validation from "../../utils/helpers/validation.js";
import Cookies from "universal-cookie";

import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { BsShieldLockFill } from "react-icons/bs";
import { GeneralTextInput } from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders.jsx";
import { StatusNotification } from "../../ui-fragments/notification.jsx";
import { ForgotStaffPasswordHook } from "../../utils/hooks/adminAuth.js";
export default function TaskerForgotPassword() {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
  });

  //defined validation schema
  const schema = {
    email: Joi.string().required().email(),
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
      forgotPassRequest(formData);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: forgotPassRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = ForgotStaffPasswordHook(onSuccess, onError);
  return (
    <>
      <div className={"staffAuthBg"}>
        <div className={"authForm"}>
          <div
            className={"authFormHeader"}
            style={{ background: "var(--green-dark)" }}
          >
            <BsShieldLockFill size={20} />
            <h4>
              {isLoading ? (
                "Requesting password reset..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "A password reset mail has been sent to your staff email account."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Forgot Password"
              )}
            </h4>
          </div>
          <form
            className={"formContainer"}
            style={{ background: "var(--green-dark)" }}
            onSubmit={handleSubmit}
          >
            <GeneralTextInput
              label={"Email / Username"}
              placeholder={"Please enter your admin mail"}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation">
              {errors.email && "A vaild email is required"}
            </small>{" "}
            <button type="submit" className={"submitBtn"} disabled={isLoading}>
              {isLoading ? <ButtonLoader /> : "Submit"}
            </button>
            <Link href={"/staff/auth/login"} className={styles.pageLink}>
              Back to login
            </Link>
          </form>
        </div>
        <div className={"PageNotice"}></div>
      </div>
    </>
  );
}

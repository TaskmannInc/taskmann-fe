import React, { useState } from "react";

import Joi from "joi-browser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import styles from "../../../styles/admin/Auth.module.css";
import validation from "../../utils/helpers/validation.js";

import { GeneralTextInput } from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { ResendCustomerVerificationLinkHook } from "../../utils/hooks/customerAuth";
export default function ResendCustomerVerification() {
  const cookie = new Cookies();

  //form states
  const [showPass, setShowPass] = useState(false);
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
      VerificationResend(formData);
      console.log("data", formData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (data) => {
    console.log(data);
    cookie.set("TM_AD_USR", data?.data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: VerificationResend,
    isLoading,
    isError,
    error,
    isSuccess,
  } = ResendCustomerVerificationLinkHook(onSuccess, onError);

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
                "Requesting verification..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Mail verification has been sent your to your inbox..."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Request verification"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <GeneralTextInput
              label={"Email / Username"}
              placeholder={"Please enter your  e-mail address"}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation">
              {errors.email && "A vaild email is required"}
            </small>{" "}
            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Request verification"}
            </button>
            <Link
              href={"/auth/signup"}
              className={"pageLink"}
              disabled={isLoading}
            >
              Back to sign up...
            </Link>
          </form>
        </div>
        <div className={styles.PageNotice}></div>
      </div>
    </>
  );
}

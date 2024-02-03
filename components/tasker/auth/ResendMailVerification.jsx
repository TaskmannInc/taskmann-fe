import React, { useState } from "react";

import Joi from "joi-browser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import styles from "../../../styles/admin/Auth.module.css";
import validation from "../../utils/helpers/validation.js";

import {
  GeneralPasswordInput,
  GeneralTextInput,
} from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { ResendStaffVerificationLinkHook } from "../../utils/hooks/adminAuth";
export default function ResendTaskerStaffVerification() {
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
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {
    // cookie.set("TM_TSK_USR", data?.data);
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
  } = ResendStaffVerificationLinkHook(onSuccess, onError);

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
      <div className={"staffAuthBg"}>
        <div className={"authForm"}>
          <div
            className={"authFormHeader"}
            style={{ background: "var(--green-dark)" }}
          >
            <FaUserAlt size={20} />
            <h4>
              {isLoading ? (
                "Requesting verification..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Verification mail has been resent to your account..."
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
          <form
            className={"formContainer"}
            style={{ background: "var(--green-dark)" }}
            onSubmit={handleSubmit}
          >
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
            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Request verification"}
            </button>
            <Link
              href={"/staff/auth/onboarding"}
              className={"pageLink"}
              disabled={isLoading}
            >
              Back to onboarding...
            </Link>
          </form>
        </div>
        <div className={styles.PageNotice}></div>
      </div>
    </>
  );
}

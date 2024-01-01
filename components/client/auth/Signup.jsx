import React, { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { FaMailBulk, FaUserAlt } from "react-icons/fa";
import Joi from "joi-browser";
import validation from "../../utils/helpers/validation.js";
import Cookies from "universal-cookie";

import {
  GeneralPasswordInput,
  GeneralTextInput,
} from "../../ui-fragments/input";
import { SendAuthenticationRequest } from "../../utils/hooks/customerAuth";
import { ButtonLoader, DataSetLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

export default function Signup() {
  //initilizations
  const router = useRouter();
  //form states
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfrmPass] = useState(false);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    // province: "",
    address: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  //defined validation schema
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userData = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone,
    email: formData.email,
    country: "Canada",
    address: formData.address,
    city: formData.city,
    password: formData.password,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      // return;
      SignupRequest(userData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {
    setTimeout(() => router.push("/auth/login"), 6000);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: SignupRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = SendAuthenticationRequest(onSuccess, onError);

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
  //toggle password show
  const toggleConfirmPasswordShow = () => {
    setShowConfrmPass(!showConfirmPass);
    var x = document.getElementById("confirm-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const [showInfo, setShowInfo] = useState(false);
  //show Info options
  const showInfoOptions = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <div className={"clientAuthBg"}>
        <div className={"authForm"}>
          <div className={"authFormHeader"}>
            <FaUserAlt size={20} />
            <h4>
              {isLoading ? (
                "We're signing you up, won't be long..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Registration successful. Kindly check your email for a verification instructions."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Sign up"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            {/*Name*/}
            <div className={"grid-col-2"}>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"First name"}
                  placeholder={"Please enter your first name"}
                  type={"text"}
                  name={"first_name"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.first_name && "Your first name is required"}
                </small>{" "}
              </div>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"Last name"}
                  placeholder={"Please enter your last name"}
                  type={"text"}
                  name={"last_name"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.last_name && "Your last name is required"}
                </small>
              </div>
            </div>
            {/*Contact*/}
            <div className={"grid-col-2"}>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"Email"}
                  placeholder={"Please enter your e-mail address"}
                  type={"email"}
                  name={"email"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.email && "A valid email is required"}
                </small>
              </div>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"Phone"}
                  placeholder={"Please enter your phone number"}
                  type={"tel"}
                  name={"phone"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.phone && "A valid phone number is required"}
                </small>
              </div>
            </div>
            {/*Address*/}
            <div className={"grid-col-2"}>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"City"}
                  placeholder={"Your city goes here"}
                  type={"text"}
                  name={"city"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.city && "Please enter your city"}
                </small>
              </div>
              <div className={"formGroupWrapper"}>
                <GeneralTextInput
                  label={"Address"}
                  placeholder={"Your address goes here"}
                  type={"text"}
                  name={"address"}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.address && "Please enter your address"}
                </small>
              </div>
            </div>
            {/*Password*/}
            <div className={"grid-col-2"}>
              <div className={"formGroupWrapper"}>
                <GeneralPasswordInput
                  label={"Password"}
                  placeholder={
                    "Please enter your password here. Make it memorable ;)"
                  }
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
              </div>
              <div className={"formGroupWrapper"}>
                <GeneralPasswordInput
                  label={"Confirm Password"}
                  placeholder={"Confirm your password"}
                  id={"confirm-password"}
                  name={"confirm_password"}
                  showPassword={showConfirmPass}
                  togglePasswordShow={toggleConfirmPasswordShow}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.confirm_password && "Must match your password"}
                </small>
              </div>
            </div>
            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Sign up"}
            </button>
            <Link href={"/auth/login"} className={"pageLink"}>
              Have an account with us? Login instead...
            </Link>
          </form>
        </div>
        <button
          className="auth-info-btn"
          title="Options"
          type="button"
          onClick={() => showInfoOptions()}
        >
          <BsFillInfoCircleFill size={20} />
        </button>
        {showInfo && (
          <div className="options-menu">
            <Link
              className="options-menu-link"
              href={"/auth/resend-verification"}
              title="Request email verification for an already onboarded account"
            >
              <span className="opt-icon">
                <MdAlternateEmail size={15} />
              </span>
              &nbsp; &nbsp;
              <span>Request mail verification</span>
            </Link>
            <Link
              className="options-menu-link"
              href={"/auth/resend-verification"}
              title="Contact admin"
            >
              <span className="opt-icon">
                <FaMailBulk size={15} />
              </span>{" "}
              &nbsp; &nbsp;
              <span>Contact admin</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

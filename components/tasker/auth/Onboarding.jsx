import React, { useState } from "react";

import Joi from "joi-browser";
import Link from "next/link";
import { FaMailBulk, FaUserAlt } from "react-icons/fa";
import validation from "../../utils/helpers/validation.js";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import {
  GeneralPasswordInput,
  GeneralTextInput,
} from "../../ui-fragments/input";
import { ButtonLoader } from "../../ui-fragments/loaders";
import { StatusNotification } from "../../ui-fragments/notification";
import { SendStaffAuthenticationRequest } from "../../utils/hooks/adminAuth";
/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import ContactAdmin from "../dashboard/subs/contactModal.jsx";
import { useRouter } from "next/router";

export default function OnboardTaskerStaff() {
  //initialize router
  const router = useRouter();
  //form states
  const [showInfo, setShowInfo] = useState(false);
  const [showContactInfo, setshowContactInfo] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfrmPass] = useState(false);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
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
      console.log("data", userData);
      // return;
      SignupRequest(userData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (data) => {
    setTimeout(() => router.push("/staff/auth/login"), 6000);
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
  } = SendStaffAuthenticationRequest(onSuccess, onError);

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

  //show Info options
  const showInfoOptions = () => {
    setShowInfo(!showInfo);
  };

  const viewContactInfo = () => {
    setshowContactInfo(!showContactInfo);
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
                "We're onboarding you, won't be long..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Onboarding successful. An account verification mail has been sent to your email address."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : (
                "Tasker Onboarding"
              )}
            </h4>
          </div>
          <form
            className={"formContainer"}
            style={{ background: "var(--green-dark)" }}
            onSubmit={handleSubmit}
          >
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
                  placeholder={"Please enter your staff e-mail address"}
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
            <button
              type="submit"
              className={"submitBtn"}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <ButtonLoader /> : "Proceed"}
            </button>
            <Link href={"/staff/auth/login"} className={"pageLink"}>
              Have a tasker account? Login instead...
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
              href={"/staff/auth/resend-verification"}
              title="Request email verification for an already onboarded account"
            >
              <span className="opt-icon">
                <MdAlternateEmail size={15} />
              </span>
              &nbsp; &nbsp;
              <span>Request mail verification</span>
            </Link>
            <button
              onClick={() => viewContactInfo()}
              className="options-menu-link"
              title="Contact admin"
            >
              <span className="opt-icon">
                <FaMailBulk size={15} />
              </span>{" "}
              &nbsp; &nbsp;
              <span>Contact admin</span>
            </button>
          </div>
        )}
      </div>
      {showContactInfo && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewContactInfo}
          // onClose={viewContactInfo}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewContactInfo}>
            <Box sx={ModalStyle}>
              <ContactAdmin closeForm={viewContactInfo} />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}

//--Material ui modal wrapper  styles--//
const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  overflowY: "auto",
  bgcolor: `var(--white)`,
  border: "none",
  boxShadow: 24,
  borderRadius: `var(--radius-md)`,
  p: 2,
};

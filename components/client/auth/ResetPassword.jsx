import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/admin/Auth.module.css";
import { FaUserAlt } from "react-icons/fa";
import Joi from "joi-browser";
import validation from "../../utils/helpers/validation.js";
import Cookies from "universal-cookie";
import { GeneralPasswordInput } from "../../ui-fragments/input";
import { SendPasswordResetDataHook } from "../../utils/hooks/customerAuth";
import { StatusNotification } from "../../ui-fragments/notification";
import { ButtonLoader } from "../../ui-fragments/loaders";

export default function ResetPassword() {
  //next router definition
  const router = useRouter();

  //form states
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });

  //defined validation schema
  const schema = {
    password: Joi.string().required(),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get email confirmation code
  let resetToken = router?.query?.code;
  console.log("resetToken", resetToken);

  const passwordResetBody = {
    code: resetToken,
    password: formData?.password,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (errors) {
    }
    if (!resetToken) {
      setTokenError(true);
    }
    if (!errors && resetToken) {
      resetRequest(passwordResetBody);
    }
  };

  //API request
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: resetRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = SendPasswordResetDataHook(onSuccess, onError);

  //toggle password show
  const togglePasswordShow = (e) => {
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
    setShowConfirmPass(!showConfirmPass);
    var x = document.getElementById("confirmpassword");
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
              {" "}
              {isLoading ? (
                "Changing your password..."
              ) : isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={"Password reset successfully"}
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : tokenError ? (
                <StatusNotification
                  type={"error"}
                  message={
                    "We could not confirm your reset code. Please click on the reset button/link in the mail sent to you and try again."
                  }
                />
              ) : (
                "Password Reset"
              )}
            </h4>
          </div>
          <form className={"formContainer"} onSubmit={handleSubmit}>
            <GeneralPasswordInput
              label={"New Password"}
              placeholder={"Please enter your new password"}
              id={"password"}
              name={"password"}
              showPassword={showPass}
              togglePasswordShow={togglePasswordShow}
              onChange={handleChange}
            />
            <small className="field-validation-contrast">
              {errors.password && "A vaild password is required"}
            </small>

            <GeneralPasswordInput
              label={"Confirm Password"}
              placeholder={"Please confirm new password"}
              id={"confirmpassword"}
              name={"confirmpassword"}
              showPassword={showConfirmPass}
              togglePasswordShow={toggleConfirmPasswordShow}
              onChange={handleChange}
            />
            <small className="field-validation-contrast">
              {errors.confirmpassword && "Your passwords must match"}
            </small>

            <button type="submit" className={"submitBtn"}>
              {isLoading ? <ButtonLoader /> : "Submit"}
            </button>
            <Link href={"/auth/login"} className={"pageLink"}>
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

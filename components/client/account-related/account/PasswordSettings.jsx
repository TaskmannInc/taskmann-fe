import Joi from "joi-browser";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GeneralPasswordInput } from "../../../ui-fragments/input";
import { DataUpdateLoader } from "../../../ui-fragments/loaders";
import {
  StatusNotification,
  SuccessfulHoverNotification,
} from "../../../ui-fragments/notification";
import validation from "../../../utils/helpers/validation.js";
import { SendPasswordChangeDataHook } from "../../../utils/hooks/customerAuth";

export default function ClientPasswordSettings({ styles, session }) {
  //component states
  const [showCurrentPass, setShowCurrentPass] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfrmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    currentpassword: "",
    newpassword: "",
    confirm_password: "",
  });

  //defined validation schema
  const schema = {
    currentpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref("newpassword")),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to submit form data
  const handleSubmit = (e) => {
    const requestBody = {
      currentpassword: formData.currentpassword,
      newpassword: formData.newpassword,
    };
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    console.log("formData", requestBody);
    if (!errors) {
      passwordUpdate(requestBody);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (response) => {
    console.info(response);
    var notifImage, notifType, notifTitle, notifMessage;
    notifImage = "";
    notifType = "success";
    notifTitle = "Password Updated";
    notifMessage = "Your password  was updated successfully.";
    SuccessfulHoverNotification(
      notifImage,
      notifType,
      notifTitle,
      notifMessage
    );
  };

  const onError = (response) => {
    console.error(response);
    var notifImage, notifType, notifTitle, notifMessage;
    notifImage = "";
    notifType = "error";
    notifTitle = "We could not update your password";
    notifMessage = "An error occured while updating your password.";
    SuccessfulHoverNotification(
      notifImage,
      notifType,
      notifTitle,
      notifMessage
    );
  };

  const {
    mutate: passwordUpdate,
    isLoading,
    isError,
    error,
    isSuccess,
  } = SendPasswordChangeDataHook(onSuccess, onError);

  //toggle password show
  const toggleCurrentPasswordShow = () => {
    setShowCurrentPass(!showCurrentPass);
    var x = document.getElementById("currentpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  //toggle password show
  const toggleNewPasswordShow = () => {
    setShowPass(!showPass);
    var x = document.getElementById("newpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  //toggle password show
  const toggleConfirmPasswordShow = () => {
    setShowConfrmPass(!showConfirmPass);
    var x = document.getElementById("confirm_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  //clear form data
  const formRef = useRef(null);
  const clearForm = () => {
    formRef.current.reset();
    setFormData({
      ...formData,
      currentpassword: "",
      newpassword: "",
      confirm_password: "",
    });
  };
  return (
    <>
      {" "}
      <Toaster reverseOrder={false} />
      <div className={styles.clientPasswordSettings}>
        <div className={styles.componentHeader}>
          <h4>Password change</h4>
        </div>
        <div className={styles.bioContainer}>
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={styles.basicInfo}
          >
            <div className={styles.basicInfoFormFields}>
              <div className={styles.inputWrapper}>
                <GeneralPasswordInput
                  label={"Current password"}
                  placeholder={"Your old password goes here..."}
                  id={"currentpassword"}
                  name={"currentpassword"}
                  showPassword={showCurrentPass}
                  togglePasswordShow={toggleCurrentPasswordShow}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.currentpassword && "A valid password is required"}
                </small>
              </div>
              <div className={styles.inputWrapper}>
                <GeneralPasswordInput
                  label={"New Password"}
                  placeholder={
                    "Your new password goes here. Make it memorable ;)"
                  }
                  id={"newpassword"}
                  name={"newpassword"}
                  showPassword={showPass}
                  togglePasswordShow={toggleNewPasswordShow}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.newpassword && "A valid password is required"}
                </small>
              </div>
              <div className={styles.inputWrapper}>
                <GeneralPasswordInput
                  label={"Confirm Password"}
                  placeholder={"Confirm your password"}
                  id={"confirm_password"}
                  name={"confirm_password"}
                  showPassword={showConfirmPass}
                  togglePasswordShow={toggleConfirmPasswordShow}
                  onChange={handleChange}
                  validate={errors}
                />
                <small className="field-validation-contrast">
                  {errors.confirm_password && "Your passwords do not match"}
                </small>
              </div>
            </div>
            <div className={styles.formAction}>
              {isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={"Password updated successfully"}
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : null}
              {isLoading && <DataUpdateLoader />}
              <button
                type="button"
                onClick={() => clearForm()}
                disabled={
                  formData.currentpassword == "" &&
                  formData.newpassword == "" &&
                  formData.confirm_password == ""
                }
                className={styles.clearBtn}
              >
                Clear
              </button>
              <button
                disabled={
                  formData.currentpassword == "" ||
                  formData.newpassword == "" ||
                  formData.confirm_password == ""
                }
                type="submit"
                className={styles.submitBtn}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

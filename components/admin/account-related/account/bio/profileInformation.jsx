import Joi from "joi-browser";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  MdCancel,
  MdOutlineMarkEmailRead,
  MdPhoneInTalk,
} from "react-icons/md";
import { GeneralTextInput } from "../../../../ui-fragments/input";
import { DataUpdateLoader } from "../../../../ui-fragments/loaders";
import {
  StatusNotification,
  SuccessfulHoverNotification,
} from "../../../../ui-fragments/notification";
import validation from "../../../../utils/helpers/validation.js";
import { UpdateStaffBioDataHook } from "../../../../utils/hooks/adminAuth";
import { StaffContextStore } from "../../../../../store/staffContextStore";

export default function StaffProfileInformation({ styles, session }) {
  const { setSession } = StaffContextStore();

  //component states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: session?.first_name,
    last_name: session?.last_name,
    email: session?.email,
    phone: session?.phone,
    city: session?.city,
    address: session?.address,
  });

  //defined validation schema
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to submit form data
  const handleSubmit = (e) => {
    const requestBody = {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      city: formData?.city,
      address: formData?.address,
    };

    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    // return;
    if (!errors) {
      bioUpdateRequest(requestBody);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (response) => {
    var user = response?.data?.result;
    sessionStorage.setItem("TM_STF_USR", JSON.stringify(user));
    setSession(user);
    var notifImage, notifType, notifTitle, notifMessage;
    notifImage = "";
    notifType = "success";
    notifTitle = "Profile Updated";
    notifMessage = "Your bio data was updated successfully.";
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
    notifTitle = "We could not update your profile";
    notifMessage = "An error occured while updating your profile bio.";
    SuccessfulHoverNotification(
      notifImage,
      notifType,
      notifTitle,
      notifMessage
    );
  };

  const {
    mutate: bioUpdateRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateStaffBioDataHook(onSuccess, onError);

  //clear form data
  const formRef = useRef(null);

  const clearForm = () => {
    formRef.current.reset();
    setFormData({
      ...formData,
      first_name: "",
      last_name: "",
      city: "",
      address: "",
    });
  };
  return (
    <>
      <Toaster reverseOrder={false} />
      <form onSubmit={handleSubmit} ref={formRef} className={styles.basicInfo}>
        <div className={styles.accountStatus}>
          <span>
            <MdOutlineMarkEmailRead size={27} />
            &nbsp; Email verification &nbsp;
            {session?.verify_email === true ? (
              <BsFillCheckCircleFill size={20} color="green" />
            ) : (
              <MdCancel size={22} color="red" />
            )}
          </span>
          <span>
            <MdPhoneInTalk size={27} />
            &nbsp; Phone verification &nbsp;
            {session?.verify_phone === true ? (
              <BsFillCheckCircleFill size={20} color="green" />
            ) : (
              <MdCancel size={22} color="red" />
            )}
          </span>
        </div>
        <div className={styles.basicInfoFormFields}>
          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"First name"}
              placeholder={"Please enter your first name"}
              type={"text"}
              name={"first_name"}
              defaultValue={formData?.first_name}
              onChange={handleChange}
              validate={errors}
              readOnly={isLoading}
            />
            <small className="field-validation-contrast">
              {errors.first_name && "Your first name is required"}
            </small>{" "}
          </div>
          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"Last name"}
              placeholder={"Please enter your last name"}
              type={"text"}
              name={"last_name"}
              defaultValue={formData?.last_name}
              onChange={handleChange}
              validate={errors}
              readOnly={isLoading}
            />
            <small className="field-validation-contrast">
              {errors.last_name && "Your last name"}
            </small>{" "}
          </div>
          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"Email"}
              placeholder={"Please enter your email"}
              type={"email"}
              name={"email"}
              defaultValue={formData?.email}
              readOnly={session?.email || isLoading}
            />
            <small className="field-validation-contrast">
              {errors.email && "A valid email is required"}
            </small>{" "}
          </div>
          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"Phone number"}
              placeholder={"Please enter your phone number"}
              type={"text"}
              name={"phone"}
              defaultValue={session?.phone}
              onChange={handleChange}
              validate={errors}
              readOnly={session?.phone || isLoading}
            />
            <small className="field-validation-contrast">
              {errors.phone && "A valid phone number is required"}
            </small>
          </div>

          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"City"}
              placeholder={"Please enter your city"}
              type={"text"}
              name={"city"}
              defaultValue={formData?.city}
              onChange={handleChange}
              validate={errors}
              readOnly={isLoading}
            />
            <small className="field-validation-contrast">
              {errors.city && "Your city is required"}
            </small>{" "}
          </div>
          <div className={styles.inputWrapper}>
            <GeneralTextInput
              label={"Address"}
              placeholder={"Please enter your street address"}
              type={"text"}
              name={"address"}
              defaultValue={formData?.address}
              onChange={handleChange}
              validate={errors}
              readOnly={isLoading}
            />
            <small className="field-validation-contrast">
              {errors.address && "Your street address is required"}
            </small>{" "}
          </div>
        </div>
        <div className={styles.formAction}>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"Profile bio data updated successfully"}
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
            className={styles.clearBtn}
          >
            Clear
          </button>
          <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </div>
      </form>
    </>
  );
}

import Joi from "joi-browser";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../ui-fragments/notification";
import validation from "../../../../utils/helpers/validation";
import { UpdateReviewHook } from "../../../../utils/hooks/reviewsMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function UpdateReviews({ closeForm }) {
  //get selected row data
  var __selected_review, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__review");
    __storageItem !== "undefined"
      ? (__selected_review = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: __selected_review?.name,
    statement: __selected_review?.statement,
  });

  //defined validation schema
  const schema = {
    name: Joi.string().required(),
    statement: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    name: formData.name,
    statement: formData.statement,
    id: __selected_review?._id,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      addpostRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addpostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateReviewHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
    localStorage.removeItem("__review");
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaStar size={25} style={{ color: "var(--gold)" }} />
          <h4>Update review</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Reviewer"}
            placeholder={"Reviewer name goes here"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            defaultValue={__selected_review?.name ?? "None"}
            readOnly={isLoading}
            required={true}
          />

          <small className="field-validation">
            {errors.name && "Reviewer name is required"}
          </small>
          <GeneralTextAreaInput
            label={"Review statement"}
            placeholder={"Review statement goes here"}
            type={"text"}
            name={"statement"}
            onChange={handleChange}
            defaultValue={__selected_review?.statement ?? "Nothing here..."}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.statement && "The review statement cannot be empty"}
          </small>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Update review"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Review updated successfully."}
          />
        ) : isError ? (
          <StatusNotification
            type={"error"}
            message={error?.response?.data?.error ?? error?.message}
          />
        ) : null}
      </div>
    </div>
  );
}

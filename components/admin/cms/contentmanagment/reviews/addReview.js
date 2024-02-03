import Joi from "joi-browser";
import { useState } from "react";
import { FaBlogger, FaStar, FaUserGraduate } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import validation from "../../../../utils/helpers/validation";
import { AddCareerOpeningHook } from "../../../../utils/hooks/careerOpeningsMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { AddReviewHook } from "../../../../utils/hooks/reviewsMgmtHook";

export default function AddReviews({ closeForm, modalEvents }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    statement: "",
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
  } = AddReviewHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaStar size={25} style={{ color: "var(--gold)" }} />
          <h4>Add a new review</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Reviewer"}
            placeholder={"Reviewer name goes here"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
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
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.statement && "The review statement cannot be empty"}
          </small>
          <button type="submit" className={styles.submitBtn}>
            {isLoading ? "Processing..." : "Add review"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Review added successfully."}
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

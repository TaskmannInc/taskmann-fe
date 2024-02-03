import Joi from "joi-browser";
import { useState } from "react";
import { MdOutlinePolicy } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../ui-fragments/notification";
import validation from "../../../../utils/helpers/validation";
import { AddPoliciesHook } from "../../../../utils/hooks/policiesHook";
import { CloseButton } from "../../../Globals/closeBtn";
import RichTextEditor from "../../../../ui-fragments/textEditor";

export default function AddPolicies({ closeForm }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    policy_name: "",
  });
  const [formattedContent, setFormattedContent] = useState(null);

  //defined validation schema
  const schema = {
    policy_name: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    policy_name: formData.policy_name,
    policy_description: formattedContent,
  };
  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors || formattedContent !== null) {
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
  } = AddPoliciesHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdOutlinePolicy size={25} />
          <h4>Add a new policy</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Policy title"}
            placeholder={"Policy title"}
            type={"text"}
            name={"policy_name"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />

          <small className="field-validation">
            {errors.policy_name && "Policy title is required"}
          </small>

          <label
            className="label"
            style={{
              display: "flex",
              width: "90%",
              fontSize: `var(--text-nm)`,
              fontWeight: "700",
            }}
          >
            Policy description &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Policy description here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Policy description cannot be empty"}
            </small>
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add policy"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"New policy added successfully."}
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

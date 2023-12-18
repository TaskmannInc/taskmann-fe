import Joi from "joi-browser";
import { useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import { FAQCategories } from "../../../../utils/constants/constants";
import validation from "../../../../utils/helpers/validation";
import { AddFAQsHook } from "../../../../utils/hooks/faqHook";
import { CloseButton } from "../../../Globals/closeBtn";
import RichTextEditor from "../../../../ui-fragments/textEditor";

export default function AddFAQs({ closeForm, modalEvents }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    question: "",
    category: null,
    active: null,
  });
  const [formattedContent, setFormattedContent] = useState(null);

  //defined validation schema
  const schema = {
    question: Joi.string().required(),
    category: Joi.optional().allow(null),
    active: Joi.boolean().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    question: formData?.question,
    answer: formattedContent,
    category: formData?.category,
    active: formData?.active == "true" ? true : false,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    !requestBody.category && delete requestBody.category;
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      addpostRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = (data) => {
    // console.log(data);
    () => closeForm();
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addpostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddFAQsHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdOutlineQuestionMark size={25} />
          <h4>Add a FAQ</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Question"}
            placeholder={"FAQ question"}
            type={"text"}
            name={"question"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.question && "FAQ question is required"}
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
            Answer &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Answer to question goes here.."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent &&
                "The answer to the question cannot be empty"}
            </small>
          </div>

          <GeneralSelectInput
            disabled={isLoading}
            label={"FAQ category"}
            name={"category"}
            defaultValue={formData.category}
            disabledDescription={"FAQ category"}
            options={FAQCategories}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.category && "FAQ category is required"}
          </small>

          <GeneralSelectInput
            required={true}
            disabled={isLoading}
            label={"FAQ status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"FAQ status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "FAQ status is required"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add FAQ"}
          </button>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"FAQ added successfully."}
            />
          ) : isError ? (
            <StatusNotification
              type={"error"}
              message={error?.response?.data?.error ?? error?.message}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

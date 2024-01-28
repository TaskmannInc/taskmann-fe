import Joi from "joi-browser";
import { useState } from "react";
import { FaBlogger, FaUserGraduate } from "react-icons/fa";
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
import RichTextEditor from "../../../../ui-fragments/textEditor.jsx";
import { useRouter } from "next/router";

export default function AddCareerOpening({ closeForm, modalEvents }) {
  //get base url
  var baseURL = window.location;
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    position: "",
    location: "",
    status: "",
    link: "",
  });

  const [formattedContent, setFormattedContent] = useState(null);

  //defined validation schema
  const schema = {
    position: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.string().required(),
    link: Joi.optional().allow(null),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    position: formData?.position,
    location: formData?.location,
    description: formattedContent,
    status:
      formData?.status == true || formData?.status == "true" ? true : false,
    link: `https://${baseURL?.host}/about/careerpage`,
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

  const onSuccess = (data) => {
    // console.log(data);
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
  } = AddCareerOpeningHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaUserGraduate size={25} />
          <h4>Add a new opening</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Position/Role"}
            placeholder={"Role/Position title goes here"}
            type={"text"}
            name={"position"}
            onChange={handleChange}
            validate={errors}
            readOnly={isLoading}
            required
          />
          <small className="field-validation">
            {errors.position && "Role / Postion is required"}
          </small>
          <GeneralTextInput
            label={"Location"}
            placeholder={"Eg: Remote, Office: Halifax, Hybrid, etc..."}
            type={"text"}
            name={"location"}
            onChange={handleChange}
            validate={errors}
            readOnly={isLoading}
            required
          />
          <small className="field-validation">
            {errors.location && "Role location is required"}
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
            Description &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Enter detailed opening description here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Opening description is required"}
            </small>
          </div>

          <GeneralSelectInput
            label={"Opening status"}
            name={"status"}
            defaultValue={formData.status}
            disabledDescription={"role status"}
            options={[
              { val: true, name: "Open" },
              { val: false, name: "Closed" },
            ]}
            onChange={handleChange}
            validate={errors}
            disabled={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.status && "Role status is required"}
          </small>
          <GeneralTextInput
            label={"Link"}
            placeholder={"Role url goes here"}
            type={"url"}
            name={"link"}
            onChange={handleChange}
            validate={errors}
            readOnly
            value={`https://${baseURL?.host}/about/careerpage`}
          />
          <small className="field-validation">
            {errors.link && "Job url must be a valid url"}
          </small>

          <button type="submit" className={styles.submitBtn}>
            {isLoading ? "Processing..." : "Add opening"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Career opening added successfully."}
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

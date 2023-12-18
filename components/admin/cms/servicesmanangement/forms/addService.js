import Joi from "joi-browser";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../ui-fragments/input.jsx";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import validation from "../../../../utils/helpers/validation";
import { AddUserData } from "../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { AddServiceHook } from "../../../../utils/hooks/serviceMgmtHook";

export default function AddSystemService({ closeForm, modalEvents }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    active: false,
  });

  //defined validation schema
  const schema = {
    service_name: Joi.string().required(),
    description: Joi.string().required(),
    active: Joi.boolean().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-->", formData);
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      mainServiceAdditionRequest(formData);
      console.log("data", formData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: mainServiceAdditionRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeForm;
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>Add service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Service name"}
            placeholder={"Service name goes here"}
            type={"text"}
            name={"service_name"}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.service_name && "Service name is required"}
          </small>
          <GeneralTextInput
            label={"Service description"}
            placeholder={"Service description goes here"}
            type={"text"}
            name={"description"}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.description && "Service description is required"}
          </small>

          <GeneralSelectInput
            label={"Service status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"service status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "Service status is required"}
          </small>

          <button type="submit" className={styles.submitBtn}>
            {isLoading ? "Setting user up..." : "Add service"}
          </button>
        </form>
      </div>
      <div className={"PageNotice"}></div>
    </div>
  );
}

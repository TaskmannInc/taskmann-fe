import { useState } from "react";
import Joi from "joi-browser";
import validation from "../../../../utils/helpers/validation";
import { GeneralTextInput } from "../../../../ui-fragments/input.jsx";
import { FaUserAlt } from "react-icons/fa";
import { AddUserData } from "../../../../utils/hooks/usermgmtHook";
import styles from "../../../../../styles/admin/Forms.module.css";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import provinceDump from "../../../../utils/data/candianProvinces.json";
import cityDump from "../../../../utils/data/cities.json";

export default function ViiewSystemService() {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    province: "",
    city: "",
    address: "",
  });

  //defined validation schema
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      SignupRequest(formData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: SignupRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddUserData(onSuccess, onError);
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h6>Viewing details for: </h6>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"First name"}
            placeholder={"Please enter your first name"}
            type={"text"}
            name={"firstname"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData.firstname}
            readOnly={true}
          />
          <small className="field-validation">
            {errors.firstname && "User first name is required"}
          </small>{" "}
          <GeneralTextInput
            label={"Last name"}
            placeholder={"Please enter your last name"}
            type={"text"}
            name={"lastname"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData.lastname}
            readOnly={true}
          />
          <small className="field-validation">
            {errors.lastname && "User last name is required"}
          </small>
          <GeneralTextInput
            label={"Email"}
            placeholder={"Please enter user e-mail address"}
            type={"email"}
            name={"email"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData.email}
            readOnly={true}
          />
          <small className="field-validation">
            {errors.email && "A valid email is required"}
          </small>
          <div className={"grid-col-2"}>
            <div className={"formGroupWrapper"}>
              <GeneralSelectInput
                label={"Province"}
                name={"province"}
                options={provinceDump}
                onChange={handleChange}
                validate={errors}
                defaultValue={formData.province}
                disabled={true}
              />
              <small className="field-validation">
                {errors.province && "Province is required"}
              </small>
            </div>
            <div className={"formGroupWrapper"}>
              <GeneralSelectInput
                label={"City"}
                name={"city"}
                options={cityDump}
                onChange={handleChange}
                validate={errors}
                defaultValue={formData.city}
                disabled={true}
              />
              <small className="field-validation">
                {errors.city && "City is required"}
              </small>
            </div>
          </div>
          <GeneralTextInput
            label={"Address"}
            placeholder={"Please enter user address"}
            type={"text"}
            name={"address"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData.address}
            readOnly={true}
          />
          <small className="field-validation">
            {errors.address && "A valid address is required"}
          </small>
          <button type="submit" className={styles.submitBtn}>
            {isLoading ? "Updating user up..." : "Update user"}
          </button>
        </form>
      </div>
      <div className={"PageNotice"}></div>
    </div>
  );
}

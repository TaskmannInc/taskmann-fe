import { useState } from "react";
import Joi from "joi-browser";
import validation from "../../../../utils/helpers/validation";
import { FaUserAlt } from "react-icons/fa";
import { AddUserData } from "../../../../utils/hooks/usermgmtHook";
import styles from "../../../../../styles/admin/Forms.module.css";

export default function DeleteSystemService({ closeForm }) {
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
          <h4>Delete user</h4>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={"grid-col-2"}>
            <button
              type="button"
              className={styles.submitBtn}
              style={{ backgroundColor: "#fff" }}
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div className={"PageNotice"}></div>
    </div>
  );
}

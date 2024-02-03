import Joi from "joi-browser";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import validation from "../../../../utils/helpers/validation";
import {
  UpdateCustomerStatusHook,
  UpdateStaffStatusHook,
} from "../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function UpdateUserStatus({ closeForm, selectedUser }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    active: selectedUser?.active,
  });

  //defined validation schema
  const schema = {
    active: Joi.string().required(),
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
      updateStatusMutation(formData);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {
    () => closeForm();
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: updateStatusMutation,
    isLoading,
    isError,
    error,
    isSuccess,
  } = selectedUser?.roles?.[0]
    ? UpdateStaffStatusHook(onSuccess, onError)
    : UpdateCustomerStatusHook(onSuccess, onError);
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h5>
            {" "}
            {isLoading ? (
              "Updating user status..."
            ) : isSuccess ? (
              <StatusNotification
                type={"success"}
                message={"User status updated successfully..."}
              />
            ) : isError ? (
              <StatusNotification
                type={"error"}
                message={error?.response?.data?.error ?? error?.message}
              />
            ) : (
              <i>
                You are updating the status for{" "}
                <span style={{ fontWeight: "bold" }}>
                  {selectedUser?.first_name}
                </span>
              </i>
            )}
          </h5>
          <CloseButton
            style={styles.closeBtn}
            closeFunc={closeForm}
            disabled={isLoading}
          />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralSelectInput
            label={"Status"}
            name={"active"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
            disabled={isLoading}
          />
          <small className="field-validation">
            {errors.active && "status is required"}
          </small>

          <button type="submit" className={styles.submitBtn}>
            {isLoading
              ? "Updating user status..."
              : isError
              ? "Retry"
              : "Update status"}
          </button>
        </form>
      </div>
    </div>
  );
}

import Joi from "joi-browser";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import validation from "../../../../utils/helpers/validation";
import { UpdateStaffRoleHook } from "../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function ChangeUserRole({ closeForm, selectedUser }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    role: "",
  });

  //defined validation schema
  const schema = {
    role: Joi.string().required(),
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
      changeRoleMutation({
        roles: [formData?.role],
        staff_id: selectedUser?._id,
      });
    } else {
      console.log(errors);
    }
  };
  const onSuccess = (data) => {
    () => closeForm();
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: changeRoleMutation,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateStaffRoleHook(onSuccess, onError);
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h5>
            {" "}
            {isLoading ? (
              "Updating user role..."
            ) : isSuccess ? (
              <StatusNotification
                type={"success"}
                message={"User role updated successfully..."}
              />
            ) : isError ? (
              <StatusNotification
                type={"error"}
                message={error?.response?.data?.error ?? error?.message}
              />
            ) : (
              <i>
                Update {selectedUser?.first_name}
                {`'s`} role
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
          <span>
            Current role:{" "}
            <i style={{ fontWeight: "700", textDecoration: "lowercase" }}>
              {selectedUser?.roles?.[0]}
            </i>
          </span>
          <GeneralSelectInput
            label={"Role"}
            name={"role"}
            options={[
              { val: "admin", name: "Admin" },
              { val: "customer", name: "Customer" },
              { val: "manager", name: "Manager" },
              { val: "tasker", name: "Tasker" },
            ]}
            onChange={handleChange}
            validate={errors}
            disabled={isLoading}
          />
          <small className="field-validation">
            {errors.role && "Please select a role to continue"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading
              ? "Updating user role, please wait..."
              : isError
              ? "Retry"
              : "Update role"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import Joi from "joi-browser";

import validation from "../../utils/helpers/validation.js";

import styles from "../../../styles/admin/Forms.module.css";
import { CloseButton } from "../../admin/Globals/closeBtn";
import { GeneralTextInput } from "../../ui-fragments/input";
import { StatusNotification } from "../../ui-fragments/notification";
import { GeneralSelectInput } from "../../ui-fragments/select";
import { UpdateTaskersTasks } from "../../utils/hooks/ordersMgmtHook";

export default function OrderActivities({ selectedOrder, closeForm }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    status: "",
  });
  const [code, setCode] = useState(null);

  //defined validation schema
  const schema = {
    status: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    action: formData.status,
    code: code,
    id: selectedOrder?._id,
  };

  const submitAssignmentData = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    (requestBody?.action == "ACCEPTED" || requestBody?.action == "REJECTED") &&
      delete requestBody.code;
    if (!errors) {
      updateTaskStatus(requestBody);
      console.log("data", formData);
    } else {
      console.log(errors);
    }
  };

  //response statuses
  const onUpdateTaskError = (response) => {
    console.log("error", response);
  };

  const onUpdateTaskSuccess = () => {
    closeModal();
  };

  const {
    mutate: updateTaskStatus,
    isLoading: isUpdatingLoading,
    isError: isUpdatingError,
    isSuccess: isUpdatingSuccess,
    error: updateError,
  } = UpdateTaskersTasks(onUpdateTaskSuccess, onUpdateTaskError);
  return (
    <div style={{ width: "100%" }}>
      <div className={"modalHeader"}>
        <FaTasks size={25} />
        <h4>
          <small style={{ fontWeight: "600", fontStyle: "italic" }}>
            {`Order ****-${selectedOrder?._id?.split("-")[4]}`}
          </small>
        </h4>
        <CloseButton className={"closeBtn"} closeFunc={closeForm} />
      </div>
      <form
        className={styles.formContainer}
        onSubmit={(e) => submitAssignmentData(e)}
      >
        <GeneralSelectInput
          label={"Task status"}
          name={"status"}
          defaultValue={formData.active}
          disabledDescription={"Task status"}
          options={[{ val: "CANCELLED", name: "Cancel order" }]}
          onChange={handleChange}
          validate={errors}
        />
        <small className="field-validation">
          {!formData.status && "Please select status to continue..."}
        </small>

        {formData?.status == "CANCELLED" && (
          <>
            <GeneralTextInput
              label={"Status code"}
              placeholder={"Enter status code. Eg: 2058"}
              type={"text"}
              name={"code"}
              onChange={(e) => setCode(e.target.value)}
              validate={errors}
            />
            <small className="field-validation">
              {formData?.status == "CANCELLED" && "Task code is required"}
            </small>
          </>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isUpdatingLoading}
        >
          {isUpdatingLoading ? "Updating..." : "Update status"}
        </button>
        {isUpdatingSuccess ? (
          <StatusNotification
            type={"success"}
            message={`Task assigned successfully.`}
          />
        ) : isUpdatingError ? (
          <StatusNotification
            type={"error"}
            message={updateError?.response?.data?.error ?? updateError?.message}
          />
        ) : null}
      </form>
    </div>
  );
}

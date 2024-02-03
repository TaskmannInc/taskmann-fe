import Joi from "joi-browser";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../../ui-fragments/input";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import validation from "../../../../../utils/helpers/validation";
import { UpdateTaskersTasks } from "../../../../../utils/hooks/ordersMgmtHook";
import { CloseButton } from "../../../..//Globals/closeBtn";

export default function ViewAssignedTask({ selectedTask, closeModal }) {
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
    id: selectedTask?._id,
  };

  const submitAssignmentData = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    (requestBody?.action == "ACCEPTED" || requestBody?.action == "REJECTED") &&
      delete requestBody.code;
    if (!errors) {
      updateTaskStatus(requestBody);
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

  if (isUpdatingSuccess) {
    closeModal();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdAssignmentAdd size={25} />
          <h4>Task status update</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeModal} />
        </div>
        <form
          className={styles.formContainer}
          onSubmit={(e) => submitAssignmentData(e)}
        >
          <div className="select-container formGroup">
            <GeneralSelectInput
              label={"Task status"}
              name={"status"}
              defaultValue={formData.active}
              disabledDescription={"Task status"}
              options={[
                { val: "ACCEPTED", name: "Accept" },
                { val: "REJECTED", name: "Reject" },
                { val: "INPROGRESS", name: "In-progress" },
                { val: "COMPLETED", name: "Completed" },
                { val: "CANCELLED", name: "Cancelled" },
              ]}
              onChange={handleChange}
              validate={errors}
            />
            <small className="field-validation">
              {!formData.status && "Please select status to continue..."}
            </small>
            {(formData?.status == "INPROGRESS" ||
              formData?.status == "COMPLETED" ||
              formData?.status == "CANCELLED") && (
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
                  {(formData?.status == "INPROGRESS" ||
                    formData?.status == "COMPLETED" ||
                    formData?.status == "CANCELLED") &&
                    "Task code is required"}
                </small>
              </>
            )}
          </div>

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
              message={
                updateError?.response?.data?.error ?? updateError?.message
              }
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

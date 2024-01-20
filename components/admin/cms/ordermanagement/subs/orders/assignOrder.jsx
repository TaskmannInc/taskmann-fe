import Joi from "joi-browser";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import { GetAllStaffMembersDataHook } from "../../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../..//Globals/closeBtn";
import validation from "../../../../../utils/helpers/validation";
import { AssignTaskHook } from "../../../../../utils/hooks/ordersMgmtHook";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { toast } from "react-hot-toast";

export default function AssignTaskOrder({ selectedOrder, closeModal }) {
  //component states
  const [taskerUsers, setTaskerUsers] = useState([]);
  const [selectedTasker, setSelectedTasker] = useState({});
  const [errors, setErrors] = useState(null);

  //Form inputs event handler
  const handleChange = (param) => {
    setSelectedTasker(param);
    console.log("param", param);
  };

  const submitAssignmentData = (e) => {
    e.preventDefault();
    const requestBody = {
      order: selectedOrder,
      tasker: selectedTasker,
    };
    if (!selectedTasker) {
      setErrors("Please select a tasker to continue");
    } else {
      setErrors(null);
      assignTaskToTasker(requestBody);
    }
    console.log(requestBody);
  };

  //response statuses
  const onStaffError = (response) => {
    console.log("error", response);
    setStaffUsers([]);
  };

  const onStaffSuccess = (response) => {
    //filter tasker users
    const filterTaskers = response?.data?.result?.filter(function (item) {
      return item?.roles?.[0] == "TASKER";
    });
    setTaskerUsers(filterTaskers);
  };

  const onAssignmentSuccess = () => {
    toast.success(`Task assigned successfully to ${selectedTasker?.firstName}`);
    closeModal();
  };

  const onAssignmentError = (response) => {
    console.log("error", response);
  };

  const {
    isLoading: isStaffLoading,
    isError: isStaffError,
    isSuccess: isStaffSuccess,
  } = GetAllStaffMembersDataHook(onStaffSuccess, onStaffError);

  const {
    mutate: assignTaskToTasker,
    isLoading: isAssignmentLoading,
    isError: isAssignmentError,
    isSuccess: isAssignmentSuccess,
    error: assignmentError,
  } = AssignTaskHook(onAssignmentSuccess, onAssignmentError);

  if (isAssignmentSuccess) {
    closeModal();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdAssignmentAdd size={25} />
          <h4>Task assignment</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeModal} />
        </div>
        <form className={styles.formContainer} onSubmit={submitAssignmentData}>
          <div className="select-container formGroup">
            <label className="label">
              {"Select a tasker to assign order"}{" "}
              {<small className="field-validation"> *</small>}
            </label>
            <div className="select-wrapper">
              <select
                className=""
                name={"tasker"}
                disabled={isAssignmentLoading || isStaffLoading}
                defaultValue={null}
                onChange={(e) => handleChange(e?.target?.value)}
              >
                <option defaultValue={true} value={null}>
                  {isStaffLoading
                    ? "Loading taskers ... "
                    : isStaffError
                    ? "An error occurred loading taskers"
                    : isStaffSuccess && "--Select tasker--"}
                </option>
                {taskerUsers?.map((opt, index) => {
                  return (
                    <option key={index + 1} value={opt?._id}>
                      {`${opt?.first_name} ${opt?.last_name} - ${opt?.email}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <small className="field-validation">
            {!selectedTasker &&
              (errors ?? "Please select a tasker to continue...")}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isAssignmentLoading || isStaffLoading}
          >
            {isAssignmentLoading ? "Assigning..." : "Assign order"}
          </button>
          {isAssignmentSuccess ? (
            <StatusNotification
              type={"success"}
              message={`Task assigned successfully.`}
            />
          ) : isAssignmentError ? (
            <StatusNotification
              type={"error"}
              message={
                assignmentError?.response?.data?.error ??
                assignmentError?.message
              }
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

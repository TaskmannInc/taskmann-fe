import { FaUsers } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { DeleteTeamMemberHook } from "../../../../utils/hooks/teamHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function DeleteTeamMember({ closeForm }) {
  //get selected row data
  var __selected_member, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__member");
    __storageItem !== "undefined"
      ? (__selected_member = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteRequest(__selected_member?._id);
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deleteRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteTeamMemberHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUsers size={25} />
          <h4>Delete team member</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <span>
          <b>{__selected_member?.name}</b>
        </span>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to delete this member?
          </span>

          <div className={"grid-col-2"}>
            <button
              type="button"
              className={styles.submitBtn}
              disabled={isLoading}
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid var(--green-darker)",
              }}
              onClick={() => closeForm(__selected_member)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              {isLoading ? "Deleting member..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      <div>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Member deleted successfully."}
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

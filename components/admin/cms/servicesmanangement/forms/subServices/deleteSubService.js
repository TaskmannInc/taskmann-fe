import { FaUserAlt } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { DeleteSubServiceHook } from "../../../../../utils/hooks/serviceMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";
import { StatusNotification } from "../../../../../ui-fragments/notification";

export default function DeleteSystemSubService({ closeForm }) {
  //get selected row data
  var __selected_sub_service, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__sub_service");
    __storageItem !== "undefined"
      ? (__selected_sub_service = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteSubServiceRequst(__selected_sub_service?._id);
  };
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deleteSubServiceRequst,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteSubServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h4>Delete sub service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <span>
            Are you sure you want to delete &nbsp;
            <small style={{ fontWeight: "600", fontStyle: "italic" }}>
              {__selected_sub_service?.sub_service_name}
            </small>{" "}
            ?
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
              onClick={() => closeForm(__selected_sub_service)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              {isLoading ? "Deleting sub service..." : "Delete"}
            </button>
          </div>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"Sub service deleted successfully."}
            />
          ) : isError ? (
            <StatusNotification
              type={"error"}
              message={error?.response?.data?.error ?? error?.message}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

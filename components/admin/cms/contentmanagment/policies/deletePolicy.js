import { MdOutlinePolicy } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { DeletePoliciesHook } from "../../../../utils/hooks/policiesHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function DeletePolicies({ closeForm }) {
  //get selected row data
  var __selected_policy, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__policy");
    __storageItem !== "undefined"
      ? (__selected_policy = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteRequest(__selected_policy?._id);
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
  } = DeletePoliciesHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <MdOutlinePolicy size={25} />
          <h4>Delete Policy</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to delete this policy?
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
              onClick={() => closeForm(__selected_policy)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              {isLoading ? "Deleting policy..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      <div>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Policy deleted successfully."}
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

import { FaStar } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { DeleteReviewHook } from "../../../../utils/hooks/reviewsMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function DeleteReviews({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__review");
    __storageItem !== "undefined"
      ? (__selected_data = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deletePostRequest(__selected_data?._id);
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deletePostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteReviewHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
    localStorage.removeItem("__review");
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaStar size={25} style={{ color: "var(--gold)" }} />
          <h4>Delete review</h4>
          <CloseButton
            style={styles.closeBtn}
            closeFunc={closeForm}
            disabled={isLoading}
          />
        </div>
        <span style={{ textAlign: "center" }}>
          Are you sure you want to delete this review?
        </span>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
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
              onClick={() => closeForm(__selected_data)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              {isLoading ? "Deleting review..." : "Delete"}
            </button>
          </div>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Review deleted successfully."}
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

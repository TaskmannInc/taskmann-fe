import { FaBlogger } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { DeleteBlogPostHook } from "../../../../utils/hooks/blogMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { StatusNotification } from "../../../../ui-fragments/notification";

export default function DeleteBlogPost({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__blog");
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

  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deletePostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteBlogPostHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaBlogger size={25} />
          <h4>Delete blog post</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
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
              {isLoading ? "Deleting post..." : "Delete"}
            </button>
          </div>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Blog post deleted successfully."}
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

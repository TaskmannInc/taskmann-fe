import { FaUsers } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../ui-fragments/notification";
import { DeleteAboutContentHook } from "../../../../utils/hooks/aboutHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { BsInfoCircleFill } from "react-icons/bs";

export default function DeleteAboutUs({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__about");
    __storageItem !== "undefined"
      ? (__selected_data = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteRequest(__selected_data?._id);
  };

  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deleteRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteAboutContentHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <BsInfoCircleFill size={25} />
          <h4>Delete info</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <span>
          <b>{__selected_data?.header}</b>
        </span>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to delete this information? This may affect
            the layout and content of the about page for customers...
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
              {isLoading ? "Deleting info..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      <div>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"About info deleted successfully."}
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

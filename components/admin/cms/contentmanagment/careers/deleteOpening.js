import { FaUserGraduate } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { DeleteCareerOpeningHook } from "../../../../utils/hooks/careerOpeningsMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";

export default function DeleteCareerOpening({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__opening");
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
    // console.log(data);
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
  } = DeleteCareerOpeningHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserGraduate size={25} />
          <h4>Delete opening</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <span style={{ textAlign: "center" }}>
          Are you sure you want to delete <em>{__selected_data?.position}</em>{" "}
          from the list of openings?
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
              {isLoading ? "Deleting Opening..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { FaStar } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import { DeleteFAQHook } from "../../../../utils/hooks/faqHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { MdOutlineQuestionMark } from "react-icons/md";

export default function DeleteFAQs({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__faq");
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
  } = DeleteFAQHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <MdOutlineQuestionMark size={25} />
          <h4>Delete FAQ</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <span style={{ textAlign: "center" }}>
          Deleting this FAQ will mean customers may not have access to this
          information in their FAQs section. Are you sure you want to continue?
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
              {isLoading ? "Deleting FAQ..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

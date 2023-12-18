import { FaTasks } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { DeletePricingTierHook } from "../../../../../utils/hooks/serviceMgmtHook";

export default function DeleteServicePriceTier({ closeForm }) {
  //get selected row data
  var __selected_tier, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__tier");
    __storageItem !== "undefined"
      ? (__selected_tier = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    deletePriceTierRequest(__selected_tier?._id);
  };

  const onSuccess = (data) => {
    // console.log(data);
  };

  const onError = (error) => {
    console.log(error.message);
  };

  const {
    mutate: deletePriceTierRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeletePricingTierHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaTasks size={25} />
          <h4>
            {isLoading ? (
              "Deleting price tier..."
            ) : isSuccess ? (
              <StatusNotification
                type={"success"}
                message={"Price tier deleted successfully..."}
              />
            ) : isError ? (
              <StatusNotification
                type={"error"}
                message={error?.response?.data?.error ?? error?.message}
              />
            ) : (
              "Delete price tier"
            )}
          </h4>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to delete &nbsp;
            <small style={{ fontWeight: "600", fontStyle: "italic" }}>
              {__selected_tier?.tier_name}
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
              onClick={() => closeForm(__selected_tier)}
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
              message={"Price tier deleted successfully."}
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

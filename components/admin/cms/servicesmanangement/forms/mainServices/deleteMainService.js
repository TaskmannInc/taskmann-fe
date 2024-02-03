import { FaUserAlt } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { DeleteMainService } from "../../../../../utils/hooks/serviceMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import Image from "next/image";

export default function DeleteSystemService({ closeForm }) {
  //get selected row data
  var __selected_service, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__service");
    __storageItem !== "undefined"
      ? (__selected_service = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();

    deleteServiceRequst(__selected_service?._id);
  };
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: deleteServiceRequst,
    isLoading,
    isError,
    error,
    isSuccess,
  } = DeleteMainService(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h4>Delete service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {__selected_service?.service_image?.image_url && (
              <Image
                src={__selected_service?.service_image?.image_url}
                width={50}
                height={50}
                style={{ height: "10rem" }}
                alt="Image preview"
                className={styles.imagePreview}
                loading="lazy"
              />
            )}
            <small style={{ marginBottom: "0.75rem" }}>
              Are you sure you want to delete &nbsp;
              <b>
                <i>{__selected_service?.service_name}</i>
              </b>
              ?{" "}
            </small>
          </div>
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
              onClick={() => closeForm(__selected_service)}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={{ backgroundColor: "#000", color: "#fff" }}
            >
              {isLoading ? "Deleting service..." : "Delete"}
            </button>
          </div>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"Service deleted successfully."}
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

import { FaBlogger, FaStar } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";
import { GeneralSelectInput } from "../../../../ui-fragments/select";

export default function ViewReviews({ closeForm }) {
  //get selected row data
  var __selected_review, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__review");
    __storageItem !== "undefined"
      ? (__selected_review = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaStar size={25} style={{ color: "var(--gold)" }} />
          <h6>Review</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <GeneralTextInput
            label={"Reviewer"}
            placeholder={"Reviewer name goes here"}
            type={"text"}
            name={"name"}
            defaultValue={__selected_review?.name ?? "None"}
            readOnly
          />

          <GeneralTextAreaInput
            label={"Review statement"}
            placeholder={"Review statement goes here"}
            type={"text"}
            name={"statement"}
            defaultValue={__selected_review?.statement ?? "No review statement"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

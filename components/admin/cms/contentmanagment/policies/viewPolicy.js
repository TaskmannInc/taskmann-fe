import { MdOutlinePolicy } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";
import DOMPurify from "dompurify";

export default function ViewPolicies({ closeForm }) {
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

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <MdOutlinePolicy size={25} />
          <h6>Policy view</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <GeneralTextInput
            label={"Policy title"}
            placeholder={"Policy title"}
            type={"text"}
            name={"policy_name"}
            defaultValue={__selected_policy?.policy_name}
            readOnly
          />

          <span
            className="mini-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            dangerouslySetInnerHTML={sanitizedData(
              __selected_policy?.policy_description
            )}
          ></span>
        </div>
      </div>
    </div>
  );
}

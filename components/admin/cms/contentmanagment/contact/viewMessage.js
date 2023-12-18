import { useState } from "react";
import { MdOutlineQuestionMark, MdQuestionAnswer } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";

export default function ViewMessageInfo({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__message");
    __storageItem !== "undefined"
      ? (__selected_data = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  const [formData, _] = useState({
    first_name: __selected_data?.first_name,
    last_name: __selected_data?.last_name,
    email: __selected_data?.email,
    phone_number: __selected_data?.phone_number,
    message: __selected_data?.message,
  });

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <MdQuestionAnswer size={25} />
          <h6>Message details</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <GeneralTextInput
            label={"First name"}
            placeholder={"First name"}
            type={"text"}
            defaultValue={formData?.first_name}
            readOnly
          />
          <GeneralTextInput
            label={"Last name"}
            placeholder={"Last name"}
            type={"text"}
            defaultValue={formData?.last_name}
            readOnly
          />
          <GeneralTextInput
            label={"Email address"}
            placeholder={"Email address"}
            type={"text"}
            defaultValue={formData?.email}
            readOnly
          />
          <GeneralTextInput
            label={"Phone number"}
            placeholder={"Phone number"}
            type={"text"}
            defaultValue={formData?.phone_number}
            readOnly
          />

          <GeneralTextAreaInput
            label={"Message"}
            placeholder={"Message goes here.."}
            type={"text"}
            name={"answer"}
            defaultValue={formData?.message ?? "Nothing here..."}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

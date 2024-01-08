import { useState } from "react";
import { FaBlogger, FaStar } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import { MdOutlineQuestionMark } from "react-icons/md";
import { FAQCategories } from "../../../../utils/constants/constants";
import DOMPurify from "dompurify";

export default function ViewFAQs({ closeForm }) {
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

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <MdOutlineQuestionMark size={25} />
          <h6>FAQ</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <GeneralTextInput
            label={"FAQ category"}
            placeholder={"FAQ Category"}
            type={"text"}
            name={"category"}
            defaultValue={__selected_data?.category ?? "None"}
            readOnly
          />
          <GeneralTextInput
            disabled={true}
            label={"FAQ status"}
            name={"active"}
            defaultValue={
              __selected_data?.active == true ? "active" : "inactive"
            }
            readOnly
          />{" "}
          <GeneralTextInput
            label={"Question"}
            placeholder={"FAQ question"}
            type={"text"}
            name={"question"}
            defaultValue={__selected_data?.question}
            readOnly
          />
          Answer
          <span
            className="mini-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "1rem 2rem",
            }}
            dangerouslySetInnerHTML={sanitizedData(__selected_data?.answer)}
          ></span>
        </div>
      </div>
    </div>
  );
}

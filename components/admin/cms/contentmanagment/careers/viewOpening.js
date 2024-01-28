import { FaBlogger, FaUserGraduate } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";
import DOMPurify from "dompurify";

export default function ViewCareerOpening({ closeForm }) {
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

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserGraduate size={25} />
          <h6>Viewing opening details</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <GeneralTextInput
            label={"Position/Role"}
            placeholder={"Role/Position title goes here"}
            type={"text"}
            name={"position"}
            defaultValue={__selected_data?.position ?? "Unavailable"}
          />

          <GeneralTextInput
            label={"Location"}
            placeholder={"Eg: Remote, Office: Halifax, Hybrid, etc..."}
            type={"text"}
            name={"location"}
            defaultValue={__selected_data?.location ?? "Unavailable"}
          />

          <GeneralTextInput
            label={"Opening status"}
            name={"active"}
            type={"text"}
            defaultValue={
              __selected_data?.status == true ||
              __selected_data?.status == "true"
                ? "Open"
                : "Closed"
            }
          />

          <GeneralTextInput
            label={"Link"}
            placeholder={"Role url goes here"}
            type={"url"}
            name={"link"}
            defaultValue={__selected_data?.link ?? "Unavailable"}
          />

          <GeneralTextInput
            label={"Requirements"}
            placeholder={"Role pre-requisites goes here"}
            type={"text"}
            name={"requirements"}
            defaultValue={__selected_data?.requirements ?? "Unavailable"}
          />

          <span
            className="mini-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "1rem 2rem",
            }}
            dangerouslySetInnerHTML={sanitizedData(
              __selected_data?.description
            )}
          ></span>
        </div>
      </div>
    </div>
  );
}

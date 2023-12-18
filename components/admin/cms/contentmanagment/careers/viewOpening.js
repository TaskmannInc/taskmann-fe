import { FaBlogger } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";

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

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaBlogger size={25} />
          <h6>Viewing blog details</h6>
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

          <GeneralTextAreaInput
            label={"Role description"}
            placeholder={"Role description goes here"}
            type={"text"}
            name={"description"}
            defaultValue={__selected_data?.description ?? "Unavailable"}
          />

          <GeneralTextInput
            label={"Opening status"}
            name={"active"}
            type={"text"}
            defaultValue={__selected_data?.active == true ? "Open" : "Closed"}
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
        </div>
      </div>
    </div>
  );
}

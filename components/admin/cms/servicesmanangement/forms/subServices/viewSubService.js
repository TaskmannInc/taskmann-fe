import Image from "next/image";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../../ui-fragments/input";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function ViewSystemSubService({ closeForm }) {
  //get selected row data
  var __selected_sub_service, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__sub_service");
    __storageItem !== "undefined"
      ? (__selected_sub_service = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>
            Sub service{" "}
            <small style={{ fontWeight: "600", fontStyle: "italic" }}>
              {__selected_sub_service?.sub_service_name}
            </small>
          </h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.uploadActions}>
            {__selected_sub_service?.subservice_image?.image_url && (
              <Image
                src={__selected_sub_service?.subservice_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                loading="lazy"
                className={styles.imagePreview}
              />
            )}
          </div>
          <GeneralTextInput
            label={"Sub service name"}
            placeholder={"Sub service name goes here"}
            type={"text"}
            name={"sub_service_name"}
            defaultValue={__selected_sub_service?.sub_service_name}
            readOnly
          />

          <GeneralTextAreaInput
            label={"Description"}
            placeholder={"Sub service description goes here"}
            type={"text"}
            name={"description"}
            defaultValue={__selected_sub_service?.description}
            readOnly
          />

          <GeneralSelectInput
            label={"Sub service status"}
            name={"active"}
            defaultValue={__selected_sub_service?.active}
            disabledDescription={"sub service status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            disabled
          />
        </div>
      </div>
      <div className={"PageNotice"}></div>
    </div>
  );
}

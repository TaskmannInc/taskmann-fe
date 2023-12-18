import { MdOutlinePolicy } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";

export default function ViewTeamMember({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__member");
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
          <FaUsers size={25} />
          <h6>Team member view</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.uploadActions}>
            {__selected_data?.member_image?.image_url && (
              <Image
                src={__selected_data?.member_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                className={styles.imagePreview}
              />
            )}
          </div>
          <GeneralTextInput
            label={"Member name"}
            placeholder={"Member name"}
            type={"text"}
            name={"name"}
            defaultValue={__selected_data?.name}
            readOnly
          />

          <GeneralTextInput
            label={"Position"}
            placeholder={"Member position"}
            type={"text"}
            name={"position"}
            readOnly
            defaultValue={__selected_data?.position}
          />

          <GeneralTextAreaInput
            label={"Member Bio"}
            placeholder={"Member bio.."}
            type={"text"}
            name={"message"}
            defaultValue={__selected_data?.message}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

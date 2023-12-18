import DOMPurify from "dompurify";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import styles from "../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../ui-fragments/input.jsx";
import { CloseButton } from "../../../Globals/closeBtn";

export default function ViewAboutUs({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__about");
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
          <BsInfoCircleFill size={25} />
          <h6>About info</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.uploadActions}>
            <Image
              src={__selected_data?.content_image?.image_url ?? ""}
              width={50}
              height={50}
              alt="Image preview"
              loading="lazy"
              className={styles.imagePreview}
            />
          </div>
          <GeneralTextInput
            label={"Header / Heading"}
            placeholder={"Header/Heading"}
            type={"text"}
            name={"header"}
            readOnly
            defaultValue={__selected_data?.header}
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
            dangerouslySetInnerHTML={sanitizedData(__selected_data?.content)}
          ></span>
        </div>
      </div>
    </div>
  );
}

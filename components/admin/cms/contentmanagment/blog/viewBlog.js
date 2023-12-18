import Image from "next/image";
import { FaBlogger } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import { CloseButton } from "../../../Globals/closeBtn";
import DOMPurify from "dompurify";

export default function ViiewBlogPost({ closeForm }) {
  //get selected row data
  var __selected_data, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__blog");
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
          <FaBlogger size={25} />
          <h6>Viewing blog details</h6>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.uploadActions}>
            {__selected_data?.blog_image?.image_url && (
              <Image
                src={__selected_data?.blog_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                className={styles.imagePreview}
              />
            )}
          </div>
          <GeneralTextInput
            type={"text"}
            placeholder={"Blog category"}
            label={"Blog category"}
            name={"category"}
            defaultValue={__selected_data?.category ?? "Unavailable"}
            readOnly={true}
          />
          <GeneralSelectInput
            label={"Blog status"}
            name={"active"}
            disabled={true}
            defaultValue={__selected_data?.active}
            disabledDescription={"blog status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
          />
          <GeneralTextInput
            label={"Author"}
            placeholder={"Author name goes here"}
            type={"text"}
            name={"author"}
            defaultValue={__selected_data?.author ?? "Unavailable"}
            readOnly={true}
          />
          <GeneralTextInput
            label={"Blog title"}
            placeholder={"Blog title goes here"}
            type={"text"}
            name={"title"}
            defaultValue={__selected_data?.title ?? "Unavailable"}
            readOnly={true}
          />
          Content
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

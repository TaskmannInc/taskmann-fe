import { useState } from "react";
import Joi from "joi-browser";
import validation from "../../../../../utils/helpers/validation";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../../ui-fragments/input.jsx";
import { FaUserAlt } from "react-icons/fa";
import { AddUserData } from "../../../../../utils/hooks/usermgmtHook";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import provinceDump from "../../../../../utils/data/candianProvinces.json";
import cityDump from "../../../../../utils/data/cities.json";
import { CloseButton } from "../../../../Globals/closeBtn";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import Image from "next/image";

export default function ViiewSystemService({ closeForm }) {
  //get selected row data
  var __selected_service, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__service");
    __storageItem !== "undefined"
      ? (__selected_service = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <FaUserAlt size={20} />
          <h5>
            Viewing details for{" "}
            <b>
              <small>
                <i>{__selected_service?.service_name}</i>
              </small>
            </b>
            ?{" "}
          </h5>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.uploadActions}>
            {__selected_service?.service_image?.image_url && (
              <Image
                src={__selected_service?.service_image?.image_url ?? ""}
                width={50}
                height={50}
                style={{ height: "10rem" }}
                alt="Image preview"
                loading="lazy"
                className={styles.imagePreview}
                readOnly={true}
              />
            )}
          </div>
          <GeneralTextInput
            readOnly={true}
            label={"Service name"}
            placeholder={"Service name goes here"}
            type={"text"}
            name={"service_name"}
            defaultValue={__selected_service?.service_name}
          />

          <GeneralTextAreaInput
            readOnly={true}
            label={"Service description"}
            placeholder={"Service description goes here"}
            type={"text"}
            name={"description"}
            defaultValue={__selected_service?.description}
          />

          <GeneralSelectInput
            disabled={true}
            label={"Service status"}
            name={"active"}
            defaultValue={__selected_service.active}
            disabledDescription={"service status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
import Joi from "joi-browser";
import { useEffect, useRef, useState } from "react";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../../ui-fragments/input.jsx";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import validation from "../../../../../utils/helpers/validation";
import { UpdateMainServiceHook } from "../../../../../utils/hooks/serviceMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";
import { BsImages } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import {} from "react";
import Image from "next/image";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import RichTextEditor from "../../../../../ui-fragments/textEditor";

export default function UpdateSystemService({ closeForm }) {
  // Image ref
  const fileInputRef = useRef();

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

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    service_name: __selected_service?.service_name,
    active: __selected_service?.active,
  });
  const [formattedContent, setFormattedContent] = useState(
    __selected_service?.description ?? ""
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //defined validation schema
  const schema = {
    service_name: Joi.string().required(),
    active: Joi.boolean().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //when image state changes
  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  }, [selectedImage]);

  //image change event
  const handleImageSelection = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const requestBody = {
    upload: selectedImage ?? __selected_service?.service_image?.image_url ?? "",
    service_name: formData?.service_name,
    description: formattedContent,
    active: formData?.active == "true" ? true : false,

    id: __selected_service?._id,
  };
  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    selectedImage == null && delete requestBody.upload;
    if (!errors || formattedContent) {
      mainServiceAdditionRequest(requestBody);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: mainServiceAdditionRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateMainServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>Update service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {(imagePreview !== null ||
              __selected_service?.service_image?.image_url) && (
              <Image
                src={
                  imagePreview ?? __selected_service?.service_image?.image_url
                }
                width={50}
                height={50}
                alt="Image preview"
                loading="lazy"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null ||
            __selected_service?.service_image?.image_url ? (
              <label type="button" className={styles.changeImage}>
                <MdPublishedWithChanges className="icon" size="20" />
                &nbsp;Change image
                <input
                  readOnly={isLoading}
                  id="profle-input"
                  name="image"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  acccept="image/x-png,image/jpeg"
                  ref={fileInputRef}
                  onChange={(event) => {
                    handleImageSelection(event);
                  }}
                />
              </label>
            ) : (
              <label className={styles.selectImage}>
                <BsImages className="icon" size="20" />
                &nbsp; Upload image
                <input
                  readOnly={isLoading}
                  id="profle-input"
                  name="image"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  acccept="image/x-png,image/jpeg"
                  ref={fileInputRef}
                  onChange={(event) => {
                    handleImageSelection(event);
                  }}
                />
              </label>
            )}
          </div>
          <GeneralTextInput
            label={"Service name"}
            placeholder={"Service name goes here"}
            type={"text"}
            name={"service_name"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData?.service_name}
          />
          <small className="field-validation">
            {errors.service_name && "Service name is required"}
          </small>

          <label
            className="label"
            style={{
              display: "flex",
              width: "90%",
              fontSize: `var(--text-nm)`,
              fontWeight: "700",
            }}
          >
            Service description &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Service description goes here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Service description is required"}
            </small>
          </div>

          <GeneralSelectInput
            disabled={isLoading}
            label={"Service status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"service status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "Service status is required"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Updating service..." : "Update service"}
          </button>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={"Service updated successfully."}
            />
          ) : isError ? (
            <StatusNotification
              type={"error"}
              message={error?.response?.data?.error ?? error?.message}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { FaTasks } from "react-icons/fa";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { UpdateSubServiceHook } from "../../../../../utils/hooks/serviceMgmtHook";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../../ui-fragments/input.jsx";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import Joi from "joi-browser";
import validation from "../../../../../utils/helpers/validation";
import { CloseButton } from "../../../../Globals/closeBtn";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import Image from "next/image";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import RichTextEditor from "../../../../../ui-fragments/textEditor";

export default function UpdateSystemSubService({ closeForm }) {
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

  // Image ref
  const fileInputRef = useRef();

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    sub_service_name: __selected_sub_service?.sub_service_name,
    active: __selected_sub_service?.active,
  });
  const [formattedContent, setFormattedContent] = useState(
    __selected_sub_service?.description ?? ""
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //defined validation schema
  const schema = {
    sub_service_name: Joi.string().required(),
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
    upload: selectedImage,
    sub_service_name: formData?.sub_service_name,
    description: formattedContent,
    active: formData?.active,
    id: __selected_sub_service?._id,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    selectedImage == null && delete requestBody.upload;
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      subServiceAdditionRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: subServiceAdditionRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateSubServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>Update sub service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {(imagePreview !== null ||
              __selected_sub_service?.subservice_image?.image_url) && (
              <Image
                src={
                  imagePreview ??
                  __selected_sub_service?.subservice_image?.image_url
                }
                width={50}
                height={50}
                alt="Image preview"
                loading="lazy"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null ||
            __selected_sub_service?.service_image?.image_url ? (
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
            readOnly={isLoading}
            label={"Sub service name"}
            placeholder={"Sub service name goes here"}
            type={"text"}
            name={"sub_service_name"}
            onChange={handleChange}
            validate={errors}
            defaultValue={formData?.sub_service_name}
          />
          <small className="field-validation">
            {errors.sub_service_name && "Sub service name is required"}
          </small>

          {/*Sub service description*/}
          <label
            className="label"
            style={{
              display: "flex",
              width: "90%",
              fontSize: `var(--text-nm)`,
              fontWeight: "700",
            }}
          >
            Description &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Sub service description goes here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Sub service description is required"}
            </small>
          </div>

          <GeneralSelectInput
            disabled={isLoading}
            label={"Sub service status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"sub service status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "Sub service status is required"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading
              ? "Updating sub service..."
              : isError
              ? "Retry"
              : "Update sub service"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Sub service updated successfully."}
          />
        ) : isError ? (
          <StatusNotification
            type={"error"}
            message={error?.response?.data?.error ?? error?.message}
          />
        ) : null}
      </div>
    </div>
  );
}

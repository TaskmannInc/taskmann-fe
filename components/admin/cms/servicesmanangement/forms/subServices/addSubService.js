import Joi from "joi-browser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import RichTextEditor from "../../../../../ui-fragments/textEditor";
import validation from "../../../../../utils/helpers/validation";
import { AddSubServiceHook } from "../../../../../utils/hooks/serviceMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function AddSystemSubService({ closeForm }) {
  //get selected row data
  var __rel_service, __storageItem;

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__rel_service");
    __storageItem !== "undefined"
      ? (__rel_service = JSON.parse(__storageItem))
      : null;
  } else {
    console.log(null);
  }

  // Image ref
  const fileInputRef = useRef();

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    sub_service_name: "",
    active: null,
  });
  const [formattedContent, setFormattedContent] = useState(null);

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
    service: __rel_service,
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
  } = AddSubServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>Add a sub service</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {imagePreview !== null && (
              <Image
                src={imagePreview}
                width={50}
                height={50}
                alt="Image preview"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null ? (
              <label type="button" className={styles.changeImage}>
                <MdPublishedWithChanges className="icon" size="20" />
                &nbsp;Change image
                <input
                  readOnly={isLoading ? true : false}
                  id="profle-input"
                  name="image"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  accept="image/x-png,image/jpeg"
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
                  id="profle-input"
                  name="image"
                  style={{ display: "none", width: "100%" }}
                  type="file"
                  accept="image/x-png,image/jpeg"
                  ref={fileInputRef}
                  onChange={(event) => {
                    handleImageSelection(event);
                  }}
                />
              </label>
            )}
          </div>
          <GeneralTextInput
            label={"Sub service name"}
            placeholder={"Sub service name goes here"}
            type={"text"}
            name={"sub_service_name"}
            onChange={handleChange}
            validate={errors}
            readOnly={isLoading}
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
            disabled={isLoading}
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
              ? "Adding sub service..."
              : isError
              ? "Retry"
              : "Add sub service"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Sub service added successfully."}
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

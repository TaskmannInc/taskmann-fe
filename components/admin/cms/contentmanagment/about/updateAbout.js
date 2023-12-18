import Joi from "joi-browser";
import { useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../ui-fragments/notification";
import validation from "../../../../utils/helpers/validation";
import { UpdateTeamMemberHook } from "../../../../utils/hooks/teamHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { UpdateAboutContentHook } from "../../../../utils/hooks/aboutHook";
import { BsImages } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import Image from "next/image";
import RichTextEditor from "../../../../ui-fragments/textEditor";

export default function UpdateAboutUs({ closeForm }) {
  // Image ref
  const fileInputRef = useRef();
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

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    header: __selected_data?.header ?? "",
  });
  const [formattedContent, setFormattedContent] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //defined validation schema
  const schema = {
    header: Joi.string().required(),
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
    header: formData?.header,
    content: formattedContent,
    id: __selected_data?._id,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    !selectedImage && delete requestBody.upload;
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      updateRequest(requestBody);
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
    mutate: updateRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateAboutContentHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaUsers size={25} />
          <h4>Update info</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {(imagePreview !== null ||
              __selected_data?.content_image?.image_url) && (
              <Image
                src={imagePreview ?? __selected_data?.content_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                loading="lazy"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null ||
            __selected_data?.content_image?.image_url ? (
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
            label={"Header / Heading"}
            placeholder={"Header/Heading"}
            type={"text"}
            name={"header"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
            defaultValue={formData?.header}
          />
          <small className="field-validation">
            {errors.header && "Header is required"}
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
            About content &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"About content goes here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "About content cannot be empty"}
            </small>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Update info"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"About info updated successfully."}
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

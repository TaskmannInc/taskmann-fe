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
import { AddTeamMemberHook } from "../../../../utils/hooks/teamHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { BsImages } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import Image from "next/image";

export default function AddTeamMember({ closeForm }) {
  // Image ref
  const fileInputRef = useRef();

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    message: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //defined validation schema
  const schema = {
    name: Joi.string().required(),
    position: Joi.string().required(),
    message: Joi.string().required(),
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
    name: formData?.name,
    position: formData?.position,
    message: formData?.message,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    !selectedImage && delete requestBody.upload;
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      addpostRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addpostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddTeamMemberHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }

  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaUsers size={25} />
          <h4>Add a new team member</h4>
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
                  id="image-input"
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
                  id="image-input"
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
            label={"Member name"}
            placeholder={"Member name"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.name && "Team member name is required"}
          </small>

          <GeneralTextInput
            label={"Position"}
            placeholder={"Member position"}
            type={"text"}
            name={"position"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.position && "Member position is required"}
          </small>

          <GeneralTextAreaInput
            label={"Member Bio"}
            placeholder={"Member bio.."}
            type={"text"}
            name={"message"}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.message && "Member bio can not be empty"}
          </small>

          <button type="submit" className={styles.submitBtn}>
            {isLoading ? "Processing..." : "Add member"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"New member added successfully."}
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

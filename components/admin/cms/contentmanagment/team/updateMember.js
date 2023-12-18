import Joi from "joi-browser";
import { useEffect, useState, useRef } from "react";
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
import { BsImages } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import Image from "next/image";

export default function UpdateTeamMember({ closeForm }) {
  // Image ref
  const fileInputRef = useRef();
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

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: __selected_data?.name ?? "",
    position: __selected_data?.position ?? "",
    message: __selected_data?.message ?? "",
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
    id: __selected_data?._id,
  };
  //function to submit form data
  const handleSubmit = (e) => {
    !selectedImage && delete requestBody.upload;
    e.preventDefault();
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
  } = UpdateTeamMemberHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaUsers size={25} />
          <h4>Update team member</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeForm} />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {(imagePreview !== null ||
              __selected_data?.member_image?.image_url) && (
              <Image
                src={imagePreview ?? __selected_data?.member_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null ||
            __selected_data?.member_image?.image_url ? (
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
            label={"Member name"}
            placeholder={"Member name"}
            type={"text"}
            name={"name"}
            onChange={handleChange}
            defaultValue={formData?.name}
            required={true}
            readOnly={isLoading}
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
            defaultValue={formData?.position}
          />
          <small className="field-validation">
            {errors.position && "Member position is required"}
          </small>

          <GeneralTextAreaInput
            label={"Member Bio"}
            placeholder={"Member bio.."}
            type={"text"}
            name={"message"}
            defaultValue={formData?.message}
            onChange={handleChange}
            readOnly={isLoading}
            required={true}
          />
          <small className="field-validation">
            {errors.message && "Member bio can not be empty"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Update member bio"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Member data updated successfully."}
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

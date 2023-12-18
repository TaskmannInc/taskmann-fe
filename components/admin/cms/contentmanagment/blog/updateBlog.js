import Joi from "joi-browser";
import { useRef, useEffect, useState } from "react";
import { FaBlogger, FaTasks } from "react-icons/fa";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import validation from "../../../../utils/helpers/validation";
import { AddUserData } from "../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { UpdateBlogPostHook } from "../../../../utils/hooks/blogMgmtHook";
import { BsImages } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import Image from "next/image";
import { StatusNotification } from "../../../../ui-fragments/notification";
import RichTextEditor from "../../../../ui-fragments/textEditor";

export default function UpdateBlogPost({ closeForm }) {
  // Image ref
  const fileInputRef = useRef();

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

  //form states
  const blogPostHolder = "Blog content goes here...";
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    author: __selected_data?.author,
    title: __selected_data?.title,
    category: __selected_data?.category,
    active: __selected_data?.active,
  });
  const [formattedContent, setFormattedContent] = useState(
    __selected_data?.content
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //defined validation schema
  const schema = {
    author: Joi.string().required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
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
    author: formData.author,
    title: formData.title,
    content: formattedContent,
    category: formData.category,
    active: Boolean(formData.active),
    id: __selected_data?._id,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    !selectedImage && delete requestBody.upload;
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      updatePostRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  const onSuccess = (data) => {
    // console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: updatePostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdateBlogPostHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaBlogger size={25} />
          <h4>Update service</h4>
          <CloseButton
            style={styles.closeBtn}
            closeFunc={closeForm}
            disabled={isLoading}
          />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.uploadActions}>
            {(imagePreview !== null ||
              __selected_data?.blog_image?.image_url) && (
              <Image
                src={imagePreview ?? __selected_data?.blog_image?.image_url}
                width={50}
                height={50}
                alt="Image preview"
                className={styles.imagePreview}
              />
            )}
            {imagePreview !== null || __selected_data?.blog_image?.image_url ? (
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
            label={"Author"}
            placeholder={"Author name goes here"}
            type={"text"}
            name={"author"}
            defaultValue={formData?.author}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.author && "Author name is required"}
          </small>

          <GeneralTextInput
            label={"Blog title"}
            placeholder={"Blog title goes here"}
            type={"text"}
            name={"title"}
            defaultValue={formData?.title}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.title && "Blog title is required"}
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
            Blog content &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Blog content goes here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Blog content  is required"}
            </small>
          </div>

          <GeneralSelectInput
            label={"Blog category"}
            name={"category"}
            defaultValue={formData?.category}
            disabledDescription={"Category"}
            options={[
              { val: "taskmann", name: "Taskmann" },
              { val: "featured", name: "Featured" },
              { val: "trending", name: "Trending" },
              { val: "others", name: "Others" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.category && "Blog category is required"}
          </small>

          <GeneralSelectInput
            label={"Blog status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"blog status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "Blog status is required"}
          </small>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Processing post..." : "Update post"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Blog post updated successfully."}
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

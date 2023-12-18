import Joi from "joi-browser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaBlogger } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import styles from "../../../../../styles/admin/Forms.module.css";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../ui-fragments/notification";
import validation from "../../../../utils/helpers/validation";
import { AddBlogPostHook } from "../../../../utils/hooks/blogMgmtHook";
import { CloseButton } from "../../../Globals/closeBtn";
import { GeneralSelectInput } from "../../../../ui-fragments/select";
import RichTextEditor from "../../../../ui-fragments/textEditor";

export default function AddBlogPost({ closeForm, modalEvents }) {
  // Image ref
  const fileInputRef = useRef();

  //form states
  const blogPostHolder = "Blog content goes here...";
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    category: "",
    active: null,
  });
  const [formattedContent, setFormattedContent] = useState(null);
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
    active: formData?.active == "true" ? true : false,
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

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addpostRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddBlogPostHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaBlogger size={25} />
          <h4>Add a new blog post</h4>
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
            defaultValue={formData.category}
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
            {isLoading ? "Processing post..." : "Add post"}
          </button>
        </form>
        {isSuccess ? (
          <StatusNotification
            type={"success"}
            message={"Blog post added successfully."}
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

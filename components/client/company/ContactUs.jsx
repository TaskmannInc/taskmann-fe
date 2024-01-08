import Joi from "joi-browser";
import React, { useState } from "react";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import styles from "../../../styles/client/Contact.module.css";
import validation from "../../utils/helpers/validation.js";

import { HiOutlineMail, HiOutlinePhoneIncoming } from "react-icons/hi";
import { StatusNotification } from "../../ui-fragments/notification.jsx";
import { AddMessageContentHook } from "../../utils/hooks/contactMessagesHook.js";
import { Toaster, toast } from "react-hot-toast";

export default function ContactCustomerCare() {
  //state objects

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    message: "",
  });

  //defined validation schema
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactRequestBody = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone_number: formData.phone,
    email: formData.email,
    message: formData.message,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      sendRequest(contactRequestBody);
    } else {
      console.log(errors);
    }
  };
  const onSuccess = () => {
    toast.success({
      message: "Your message has been sent over. Our team will be in touch.",
    });
  };

  const onError = (error) => {
    toast.error({
      message: `We. could not send over your message. ${
        error?.response?.data?.error ?? error?.message
      }`,
    });
  };

  const {
    mutate: sendRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AddMessageContentHook(onSuccess, onError);

  return (
    <>
      <Toaster reverseOrder={false} />
      <section className={styles.contactsBanner}>
        <h2 className={styles.contactsHeading}>Leave us a message</h2>
        <p className={styles.tagLine}>Tell us how we can help you today...</p>
      </section>
      <div className={styles.contactRequest}>
        <div className={styles.contactRequestForm}>
          <h4>Get in touch</h4>
          <MdOutlinePermContactCalendar size={40} />

          <>
            <form className={styles.requestForm} onSubmit={handleSubmit}>
              <div className={"grid-col-2"}>
                <div className={styles.contactInputWrapper}>
                  <label>First name</label>
                  <input
                    placeholder={"Please enter your first name"}
                    type={"text"}
                    name={"first_name"}
                    defaultValue={formData?.first_name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.first_name && "Your first name is required"}
                  </small>{" "}
                </div>
                <div className={styles.contactInputWrapper}>
                  <label>Last name</label>
                  <input
                    placeholder={"Please enter your last name"}
                    type={"text"}
                    name={"last_name"}
                    defaultValue={formData?.last_name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.last_name && "Your last name is required"}
                  </small>
                </div>
              </div>
              <div className={"grid-col-2"}>
                <div className={styles.contactInputWrapper}>
                  <label>Email</label>
                  <input
                    placeholder={"Please enter your mail address"}
                    type={"email"}
                    name={"email"}
                    defaultValue={formData?.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.email && "A vaild email is required"}
                  </small>{" "}
                </div>
                <div className={styles.contactInputWrapper}>
                  <label>Mobile / Telephone</label>
                  <input
                    placeholder={
                      "Please enter your contact phone /telephone number"
                    }
                    type={"phone"}
                    name={"phone"}
                    defaultValue={formData?.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.phone && "A vaild phone number is required"}
                  </small>{" "}
                </div>
              </div>

              <div className={styles.contactTextAreaWrapper}>
                <label>Message </label>
                <textarea
                  type={"text"}
                  placeholder={"Your message goes here..."}
                  name={"message"}
                  defaultValue={formData?.message}
                  onChange={handleChange}
                  validate={errors}
                  className={styles.textarea}
                />
                <small className="field-validation-contrast">
                  {errors.message &&
                    "Please enter a message to send to our team"}
                </small>{" "}
              </div>

              <button className={styles.submitBtn}>
                {isLoading ? "Sending over your message..." : "Submit"}
              </button>
            </form>
          </>
          <div style={{ width: "80%" }}>
            {isSuccess ? (
              <StatusNotification
                type="success"
                message={`Your message was sent successfully 🎉. Our team will be in touch`}
              />
            ) : isError ? (
              <StatusNotification
                type="error"
                message={error?.response?.data?.error ?? error?.message}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.contactRequestIllustration}>
          <span>You can also ...</span>
          <div className={styles.otherContactModes}>
            <a href="tel:902-579-0172" className={styles.contactItem}>
              <HiOutlinePhoneIncoming size={25} />
              &nbsp;
              <i>Call us</i> &nbsp;&nbsp;&nbsp; 902-579-0172
            </a>
            <a
              href="mailto:support@taskmann.com"
              className={styles.contactItem}
            >
              <HiOutlineMail size={25} />
              &nbsp; <i>Mail us</i>
              &nbsp;&nbsp;&nbsp; support@taskmann.com
            </a>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

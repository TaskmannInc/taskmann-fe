import Joi from "joi-browser";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import styles from "../../../styles/client/Services.module.css";
import validation from "../../utils/helpers/validation.js";

import { StatusNotification } from "../../ui-fragments/notification.jsx";
import { primaryCurrency } from "../../utils/constants/constants.js";
import { RequestCustomServiceHook } from "../../utils/hooks/orderHook.js";

export default function ServiceRequest() {
  //get selected service to book
  const orderingState = {
    customService:
      typeof window !== "undefined"
        ? sessionStorage.getItem("customBooking")
        : null,
    session: sessionStorage?.getItem("TM_AC_TK"),
    sessionData: sessionStorage?.getItem("TM_AC_USR"),
  };

  var customServiceData = JSON.parse(orderingState?.customService);
  var requestBio = JSON.parse(orderingState?.sessionData);

  // next router definition
  const router = useRouter();
  var queryParams = router?.query?.sv;

  //state objects
  var [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  var [formData, setFormData] = useState({
    firstname: requestBio?.first_name,
    lastname: requestBio?.last_name,
    phone: requestBio?.phone,
    email: requestBio?.email,
    service_date_time: "",
    end_date: "",
    budget: "",
    description: "",
  });

  //defined validation schema
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    service_date_time: Joi.string().required(),
    end_date: Joi.string().required(),
    budget: Joi.string().required(),
    description: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModifyContactModes = (e, option) => {
    const isChecked = e.target?.checked;
    let checked_options = [...contacts];
    if (isChecked) {
      // add to array if it is not there are already
      if (!checked_options.includes(option)) {
        checked_options.push(option);
      }
    } else {
      checked_options.splice(
        checked_options.findIndex((cj) => cj == option),
        1
      );
    }
    console.log("checked==>", checked_options);
    // formData.contactModes == checked_options;
    setContacts(checked_options);
  };
  // 2024-02-03T02:30:00.000Z
  const serviceRequestBody = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    phone: formData.phone,
    email: formData.email,
    service_date_time: formData.service_date_time,
    end_date: formData.end_date,
    budget: formData?.budget,
    description: `${formData?.description}; Contact modes: ${Object.values(
      contacts
    )}`,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (Object.values(serviceRequestBody).some((x) => x !== null && x !== "")) {
      sendRequest(serviceRequestBody);
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
    mutate: sendRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = RequestCustomServiceHook(onSuccess, onError);

  return (
    <>
      <section className={styles.servicesBanner}>
        <h2 className={styles.servicesHeading}>Request a service</h2>
        <p className={styles.tagLine}>
          {"Can't"} find the service you need or have a more tailored request?
          Kindly fill out the form below and a customer representative will be
          assigned to you in a short time.
        </p>
      </section>
      <div className={styles.serviceRequest}>
        <div className={styles.serviceRequestIllustration}>
          <span>Send us a direct request</span>
        </div>

        <div className={styles.serviceRequestForm}>
          <h5 style={{ fontWeight: "500" }}>
            Kindly fill out the form below to request{" "}
            <i style={{ fontWeight: "800" }}>
              {customServiceData
                ? `the ${customServiceData?.sub_service_name} `
                : "an unlisted "}{" "}
            </i>
            service.
          </h5>
          <MdOutlineCleaningServices size={40} />

          <>
            <form className={styles.requestForm} onSubmit={handleSubmit}>
              <div className={"grid-col-2"}>
                <div className={styles.serviceInputWrapper}>
                  <label>First name</label>
                  <input
                    readOnly={isLoading}
                    placeholder={"Please enter your first name"}
                    type={"text"}
                    name={"firstname"}
                    onChange={handleChange}
                    className={styles.input}
                    defaultValue={formData?.firstname ?? ""}
                  />
                  <small className="field-validation-contrast">
                    {errors.firstname && "Your first name is required"}
                  </small>{" "}
                </div>
                <div className={styles.serviceInputWrapper}>
                  <label>Last name</label>
                  <input
                    readOnly={isLoading}
                    placeholder={"Please enter your last name"}
                    type={"text"}
                    name={"lastname"}
                    onChange={handleChange}
                    className={styles.input}
                    defaultValue={formData?.lastname ?? ""}
                  />
                  <small className="field-validation-contrast">
                    {errors.lastname && "Your last name is required"}
                  </small>
                </div>
              </div>
              <div className={"grid-col-2"}>
                <div className={styles.serviceInputWrapper}>
                  <label>Email</label>
                  <input
                    readOnly={isLoading}
                    placeholder={"Please enter your mail address"}
                    type={"email"}
                    name={"email"}
                    onChange={handleChange}
                    className={styles.input}
                    defaultValue={formData?.email ?? ""}
                  />
                  <small className="field-validation-contrast">
                    {errors.email && "A vaild email is required"}
                  </small>{" "}
                </div>
                <div className={styles.serviceInputWrapper}>
                  <label>Mobile / Telephone</label>
                  <input
                    readOnly={isLoading}
                    placeholder={
                      "Please enter your contact phone /telephone number"
                    }
                    type={"phone"}
                    name={"phone"}
                    onChange={handleChange}
                    className={styles.input}
                    defaultValue={formData?.phone ?? ""}
                  />
                  <small className="field-validation-contrast">
                    {errors.phone && "A vaild phone number is required"}
                  </small>{" "}
                </div>
              </div>

              <div className={"grid-col-2"}>
                <div className={styles.serviceInputWrapper}>
                  <label>Service start date/time</label>
                  <input
                    min={new Date().getDate()}
                    readOnly={isLoading}
                    type={"datetime-local"}
                    name={"service_date_time"}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.service_date_time &&
                      "Service date and time are required"}
                  </small>{" "}
                </div>
                <div className={styles.serviceInputWrapper}>
                  <label>Proposed service end date</label>
                  <input
                    min={new Date().getDate()}
                    readOnly={isLoading}
                    type={"date"}
                    name={"end_date"}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.end_date && "Service end date is required"}
                  </small>
                </div>
                <div className={styles.serviceInputWrapper}>
                  <label>Budgeted cost</label>
                  <input
                    readOnly={isLoading}
                    type={"number"}
                    min={0}
                    placeholder={`${primaryCurrency}Estimated cost`}
                    name={"budget"}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <small className="field-validation-contrast">
                    {errors.budget && "A budgeted cost is required"}
                  </small>{" "}
                </div>
              </div>
              <div className={styles.contactMode}>
                <label>Preferred mode of contact</label>
                <div className={styles.contactOptions}>
                  <div className={styles.contactcheckWrapper}>
                    <label>E-mail</label>&nbsp;
                    <input
                      readOnly={isLoading}
                      type={"checkbox"}
                      name={"contactMode"}
                      onChange={handleChange}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      onClick={(e) => handleModifyContactModes(e, "email")}
                    />
                  </div>
                  <div className={styles.contactcheckWrapper}>
                    <label>Call</label>&nbsp;
                    <input
                      readOnly={isLoading}
                      type={"checkbox"}
                      name={"contactMode"}
                      onChange={handleChange}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      onClick={(e) => handleModifyContactModes(e, "phone")}
                    />
                  </div>
                  <div className={styles.contactcheckWrapper}>
                    <label>SMS</label>&nbsp;
                    <input
                      readOnly={isLoading}
                      type={"checkbox"}
                      name={"contactMode"}
                      onChange={handleChange}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      onClick={(e) => handleModifyContactModes(e, "sms")}
                    />
                  </div>
                </div>
                <small className="field-validation-contrast">
                  {contacts?.length == 0 &&
                    "Please select at least one mode of contact"}
                </small>{" "}
              </div>
              <div className={styles.serviceTextAreaWrapper}>
                <label>
                  Service description {`(Including the service location)`}
                </label>
                <textarea
                  readOnly={isLoading}
                  type={"text"}
                  placeholder={
                    "Please type in a vivid description of the service you are requesting. Also, include the location of service in this section..."
                  }
                  name={"description"}
                  onChange={handleChange}
                  validate={errors}
                  className={styles.textarea}
                />
                <small className="field-validation-contrast">
                  {!formData.description &&
                    "A detail description of your custom service is required"}
                </small>{" "}
              </div>
              <button
                className={styles.submitBtn}
                type="submit"
                disabled={
                  isLoading ||
                  isSuccess ||
                  contacts?.length == 0 ||
                  !formData.description
                }
              >
                {isLoading ? "Submitting ..." : "Send request"}
              </button>
              {isSuccess ? (
                <StatusNotification
                  type={"success"}
                  message={
                    "Your request has been submitted successfully. The team will be in touch shortly..."
                  }
                />
              ) : isError ? (
                <StatusNotification
                  type={"error"}
                  message={error?.response?.data?.error ?? error?.message}
                />
              ) : null}
            </form>
          </>
        </div>
      </div>
    </>
  );
}

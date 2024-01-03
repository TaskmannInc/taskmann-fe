import Joi from "joi-browser";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import styles from "../../../styles/client/Services.module.css";
import validation from "../../utils/helpers/validation.js";

import { RequestServiceHook } from "../../utils/hooks/orderHooks";

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
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    // province: "",
    address: "",
    city: "",
  });

  const showStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };
  const showStepTwo = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  //defined validation schema
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
    city: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const serviceRequestBody = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone,
    email: formData.email,
    country: "Canada",
    address: formData.address,
    city: formData.city,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      console.log("data", userData);
      // return;
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
    data: submissionResponse,
    isError,
    error,
    isSuccess,
  } = RequestServiceHook(onSuccess, onError);

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

          {stepOne && (
            <>
              <form className={styles.requestForm} onSubmit={handleSubmit}>
                <div className={"grid-col-2"}>
                  <div className={styles.serviceInputWrapper}>
                    <label>First name</label>
                    <input
                      placeholder={"Please enter your first name"}
                      type={"text"}
                      name={"first_name"}
                      onChange={handleChange}
                      className={styles.input}
                      defaultValue={requestBio?.first_name ?? ""}
                    />
                    <small className="field-validation-contrast">
                      {errors.first_name && "Your first name is required"}
                    </small>{" "}
                  </div>
                  <div className={styles.serviceInputWrapper}>
                    <label>Last name</label>
                    <input
                      placeholder={"Please enter your last name"}
                      type={"text"}
                      name={"last_name"}
                      onChange={handleChange}
                      className={styles.input}
                      defaultValue={requestBio?.last_name ?? ""}
                    />
                    <small className="field-validation-contrast">
                      {errors.last_name && "Your last name is required"}
                    </small>
                  </div>
                </div>
                <div className={"grid-col-2"}>
                  <div className={styles.serviceInputWrapper}>
                    <label>Email</label>
                    <input
                      placeholder={"Please enter your mail address"}
                      type={"email"}
                      name={"email"}
                      onChange={handleChange}
                      className={styles.input}
                      defaultValue={requestBio?.email ?? ""}
                    />
                    <small className="field-validation-contrast">
                      {errors.email && "A vaild email is required"}
                    </small>{" "}
                  </div>
                  <div className={styles.serviceInputWrapper}>
                    <label>Mobile / Telephone</label>
                    <input
                      placeholder={
                        "Please enter your contact phone /telephone number"
                      }
                      type={"phone"}
                      name={"phone"}
                      onChange={handleChange}
                      className={styles.input}
                      defaultValue={requestBio?.phone ?? ""}
                    />
                    <small className="field-validation-contrast">
                      {errors.phone && "A vaild phone number is required"}
                    </small>{" "}
                  </div>
                </div>
                <div className={"grid-col-2"}>
                  <div className={styles.serviceInputWrapper}>
                    <label>Service start date</label>
                    <input
                      type={"date"}
                      name={"service_date"}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <small className="field-validation-contrast">
                      {errors.service_date && "Service date is required"}
                    </small>{" "}
                  </div>
                  <div className={styles.serviceInputWrapper}>
                    <label>Service start time</label>
                    <input
                      type={"time"}
                      name={"service_time"}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <small className="field-validation-contrast">
                      {errors.service_time && "Service time is required"}
                    </small>{" "}
                  </div>
                </div>
                <div className={"grid-col-2"}>
                  <div className={styles.serviceInputWrapper}>
                    <label>Service location</label>
                    <input
                      type={"text"}
                      placeholder={"Please enter the service request location"}
                      name={"service_location"}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <small className="field-validation-contrast">
                      {errors.service_location &&
                        "A service_location is required"}
                    </small>{" "}
                  </div>
                  <div className={styles.serviceInputWrapper}>
                    <label>Budgeted cost</label>
                    <input
                      type={"number"}
                      min={0}
                      placeholder={"Estimated costs"}
                      name={"service_budget"}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <small className="field-validation-contrast">
                      {errors.service_budget && "A budgeted cost is required"}
                    </small>{" "}
                  </div>
                </div>
                <div className={styles.serviceTextAreaWrapper}>
                  <label>Service description</label>
                  <textarea
                    type={"text"}
                    placeholder={
                      "Please type in a vivid description of the service you are requesting..."
                    }
                    name={"service_description"}
                    onChange={handleChange}
                    validate={errors}
                    className={styles.textarea}
                  />
                  <small className="field-validation-contrast">
                    {errors.service_description && "Service description"}
                  </small>{" "}
                </div>
                <div className={styles.contactMode}>
                  <label>Preferred mode of contact</label>
                  <div className={styles.contactOptions}>
                    <div className={styles.contactcheckWrapper}>
                      <label>Email</label>&nbsp;
                      <input
                        type={"checkbox"}
                        name={"contact_mode"}
                        defaultChecked={"email"}
                        onChange={handleChange}
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                        // className={styles.checker}
                      />
                    </div>
                    <div className={styles.contactcheckWrapper}>
                      <label>Phone call</label>&nbsp;
                      <input
                        type={"checkbox"}
                        name={"contact_mode"}
                        defaultChecked={"phone_call"}
                        onChange={handleChange}
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                        // className={styles.checker}
                      />
                    </div>
                    <div className={styles.contactcheckWrapper}>
                      <label>Text message</label>&nbsp;
                      <input
                        type={"checkbox"}
                        name={"contact_mode"}
                        defaultChecked={"text_message"}
                        onChange={handleChange}
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                        // className={styles.checker}
                      />
                    </div>
                  </div>
                  <small className="field-validation-contrast">
                    {errors.contact_mode && "Contact mode"}
                  </small>{" "}
                </div>
                <button className={styles.submitBtn}>Send request</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

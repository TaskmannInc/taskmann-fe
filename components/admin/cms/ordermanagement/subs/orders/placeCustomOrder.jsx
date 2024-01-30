import Joi from "joi-browser";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import {
  GetAllCustomersDataHook,
  GetAllStaffMembersDataHook,
} from "../../../../../utils/hooks/usermgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";
import validation from "../../../../../utils/helpers/validation";
import {
  AdminRequestCustomServiceHook,
  AssignTaskHook,
} from "../../../../../utils/hooks/ordersMgmtHook";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { toast } from "react-hot-toast";
import {
  GeneralTextAreaInput,
  GeneralTextInput,
} from "../../../../../ui-fragments/input";
import { primaryCurrency } from "../../../../../utils/constants/constants";

export default function PlaceCustomServiceOrder({ closeModal }) {
  //state objects
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  var [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  var [formData, setFormData] = useState({
    firstname: "Staff",
    lastname: "Requested",
    phone: "",
    email: "",
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
    id: selectedCustomer,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);

    console.log(serviceRequestBody);
    setErrors(errors || {});
    if (Object.values(serviceRequestBody).some((x) => x !== null && x !== "")) {
      sendRequest(serviceRequestBody);
    } else {
      console.log(errors);
    }
  };

  //response statuses
  const onUsersError = (response) => {
    console.log("error", response);
    setCustomers([]);
  };

  const onUsersSuccess = (response) => {
    //filter customer users
    setCustomers(response?.data?.result);
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    isLoading: isUsersLoading,
    isError: isUsersError,
    isSuccess: isUsersSuccess,
  } = GetAllCustomersDataHook(onUsersSuccess, onUsersError);

  const {
    mutate: sendRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = AdminRequestCustomServiceHook(onSuccess, onError);

  if (isSuccess) {
    closeModal();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdAssignmentAdd size={25} />
          <h4>Admin custom service placement</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeModal} />
        </div>
        <div className="select-container formGroup">
          <label className="label">
            {"Select a user to place an order on behalf"}{" "}
            {<small className="field-validation"> *</small>}
          </label>
          <div className="select-wrapper">
            <select
              className=""
              name={"tasker"}
              disabled={isUsersLoading || isLoading}
              defaultValue={null}
              onChange={(e) => setSelectedCustomer(e?.target?.value)}
            >
              <option defaultValue={true} value={null}>
                {isUsersLoading
                  ? "Loading customers ... "
                  : isUsersError
                  ? "An error occurred fetching customers"
                  : isUsersSuccess && "--Pick a customer--"}
              </option>
              {customers?.map((opt, index) => {
                return (
                  <option key={index + 1} value={opt?._id}>
                    {`${opt?.first_name} ${opt?.last_name} - ${opt?.email}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={"grid-col-2"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
              <label>First name</label>
              <input
                readOnly
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
              <label>Last name</label>
              <input
                readOnly
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                rowGap: "0.5rem",
              }}
            >
              <label>Budgeted cost</label>
              <input
                readOnly={isLoading}
                type={"number"}
                min={0}
                placeholder={`${primaryCurrency} Estimated cost`}
                name={"budget"}
                onChange={handleChange}
                className={styles.input}
              />
              <small className="field-validation-contrast">
                {errors.budget && "A budgeted cost is required"}
              </small>{" "}
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              rowGap: "1rem",
              padding: "0.25rem 1rem",
            }}
          >
            <label>Preferred mode of contact</label>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  rowGap: "0.5rem",
                }}
              >
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
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  rowGap: "0.5rem",
                }}
              >
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
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  rowGap: "0.5rem",
                }}
              >
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
            <div style={{ width: "110%" }}>
              <GeneralTextAreaInput
                label={`Service description (Including the service location)`}
                placeholder={"Service description goes here ..."}
                type={"text"}
                name={"description"}
                defaultValue={formData?.description ?? "Nothing here..."}
                readOnly={isLoading}
                onChange={handleChange}
              />
            </div>
            <small className="field-validation-contrast">
              {errors?.description &&
                "Service description (Including the service location) is required"}
            </small>{" "}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={
              isLoading ||
              !selectedCustomer ||
              contacts?.length == 0 ||
              !formData.description
            }
          >
            {isLoading ? "Placing order..." : "Place order"}
          </button>
          {isSuccess ? (
            <StatusNotification
              type={"success"}
              message={`Order placed successfully.`}
            />
          ) : isError ? (
            <StatusNotification
              type={"error"}
              message={error?.response?.data?.error ?? error?.message}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

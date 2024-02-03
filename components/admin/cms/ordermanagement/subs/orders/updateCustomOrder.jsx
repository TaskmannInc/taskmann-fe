import Joi from "joi-browser";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import { primaryCurrency } from "../../../../../utils/constants/constants";
import validation from "../../../../../utils/helpers/validation";
import { UpdateAdminCustomRequestHook } from "../../../../../utils/hooks/ordersMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function UpdateExistingCustomOrder({
  closeAdminModal,
  selectedSpecialRequest,
}) {
  //state objects
  var [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  var [formData, setFormData] = useState({
    firstname:
      selectedSpecialRequest?.customer?.firstname ??
      selectedSpecialRequest?.firstname,
    lastname:
      selectedSpecialRequest?.customer?.lastname ??
      selectedSpecialRequest?.lastname,
    phone: selectedSpecialRequest?.phone,
    email: selectedSpecialRequest?.email,
    start_date_time: selectedSpecialRequest?.start_date_time,
    end_date: selectedSpecialRequest?.end_time,
    budget: selectedSpecialRequest?.budget,
    description: selectedSpecialRequest?.description,
    status: selectedSpecialRequest?.status,
  });

  //defined validation schema
  const schema = {
    phone: Joi.string().required(),
    service_date_time: Joi.string().required(),
    end_date: Joi.string().required(),
    budget: Joi.string().required(),
    status: Joi.optional().allow(null),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const serviceRequestBody = {
    phone: formData.phone,
    email: formData.email,
    start_date_time:
      new Date(formData.start_date_time).toUTCString() ??
      new Date(selectedSpecialRequest.start_date_time).toUTCString(),
    end_date: formData.end_date ?? selectedSpecialRequest.end_date,
    budget: formData?.budget,
    status: formData.status ?? selectedSpecialRequest.status,
    id: selectedSpecialRequest?._id,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    console.log(serviceRequestBody);
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
  } = UpdateAdminCustomRequestHook(onSuccess, onError);

  if (isSuccess) {
    closeAdminModal();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <MdAssignmentAdd size={25} />
          <h4>Update custom service placement</h4>
          <CloseButton style={styles.closeBtn} closeFunc={closeAdminModal} />
        </div>
        <div className="select-container formGroup">
          <GeneralSelectInput
            disabled={isLoading}
            label={"Order status"}
            name={"status"}
            defaultValue={null}
            disabledDescription={"Order status"}
            options={[
              { val: "requested", name: "Accept" },
              { val: "accepted", name: "Reject" },
              { val: "inprogress", name: "In-progress" },
              { val: "completed", name: "Completed" },
              { val: "cancelled", name: "Cancelled" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
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
                readOnly
                placeholder={"Please enter your mail address"}
                type={"email"}
                name={"email"}
                onChange={handleChange}
                className={styles.input}
                defaultValue={formData?.email ?? ""}
              />
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
                {!formData.phone && "A vaild phone number is required"}
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
              <label>
                Service start date/time.{" "}
                <small style={{ fontSize: "0.65rem" }}>
                  Current:{" "}
                  {`${new Date(
                    selectedSpecialRequest?.start_date_time
                  ).toLocaleDateString()}
                  , 
                  ${new Date(
                    selectedSpecialRequest?.start_date_time
                  ).toLocaleTimeString()}`}
                </small>
              </label>
              <input
                min={new Date().getDate()}
                readOnly={isLoading}
                type={"datetime-local"}
                name={"start_date_time"}
                onChange={handleChange}
                className={styles.input}
              />
              <small className="field-validation-contrast">
                {!formData?.start_date_time &&
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
              <label>
                Proposed service end date &nbsp;
                <small style={{ fontSize: "0.65rem" }}>
                  Current:{" "}
                  {new Date(
                    selectedSpecialRequest?.end_date
                  ).toLocaleDateString()}
                </small>
              </label>
              <input
                min={new Date().getDate()}
                readOnly={isLoading}
                type={"date"}
                name={"end_date"}
                onChange={handleChange}
                className={styles.input}
              />
              <small className="field-validation-contrast">
                {!serviceRequestBody.end_date && "Service end date is required"}
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
                defaultValue={formData?.budget}
              />
              <small className="field-validation-contrast">
                {!formData?.budget && "A budgeted cost is required"}
              </small>{" "}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Updating order..." : "Update order"}
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

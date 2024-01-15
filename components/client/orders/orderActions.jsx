import Joi from "joi-browser";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";

import validation from "../../utils/helpers/validation.js";

import styles from "../../../styles/admin/Forms.module.css";
import { CloseButton } from "../../admin/Globals/closeBtn";
import { GeneralTextInput } from "../../ui-fragments/input";
import { StatusNotification } from "../../ui-fragments/notification";
import { CancelSessionUserOrderHook } from "../../utils/hooks/orderHook.js";

export default function OrderActivities({ selectedOrder, closeForm }) {
  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    code: "",
  });

  //defined validation schema
  const schema = {
    code: Joi.string().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    code: formData?.code,
    id: selectedOrder?._id,
  };

  const submitAssignmentData = (e) => {
    e.preventDefault();
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      cancelSessionOrder(requestBody);
    } else {
      console.log(errors);
    }
  };

  //response statuses
  const onCancelOrderError = (response) => {
    console.log("error", response);
  };

  const onCancelOrderSuccess = () => {
    closeForm();
  };

  const {
    mutate: cancelSessionOrder,
    isLoading: isCancellingOrder,
    isError: isCancellingOrderError,
    isSuccess: isCancellingOrderSuccess,
    error: cancellationError,
  } = CancelSessionUserOrderHook(onCancelOrderSuccess, onCancelOrderError);

  if (isCancellingOrderSuccess) {
    closeForm();
  }
  return (
    <div style={{ width: "100%" }}>
      <div className={"modalHeader"}>
        <FaTasks size={25} />
        <h4>
          <small style={{ fontWeight: "600", fontStyle: "italic" }}>
            {`Order ****-${selectedOrder?._id?.split("-")[4]}`}
          </small>
        </h4>
        <CloseButton className={"closeBtn"} closeFunc={closeForm} />
      </div>
      <legend
        style={{
          fontSize: "1rem",
          padding: "1rem 0.5rem",
          textAlign: "center",
        }}
      >
        Are you sure you want to cancel this order? You will be charged a
        cancellation fee of{" "}
        <b>
          <i>{"20%"}</i>
        </b>{" "}
        the order amount on refund ...
      </legend>
      <form
        className={styles.formContainer}
        onSubmit={(e) => submitAssignmentData(e)}
      >
        <GeneralTextInput
          label={"Status code"}
          placeholder={"Enter order cancellation code. Eg: 2058"}
          type={"text"}
          name={"code"}
          onChange={(e) => handleChange(e)}
          validate={errors}
        />
        {errors.code && (
          <small className="field-validation">
            Order cancellation code is required to continue ...
          </small>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          style={{ backgroundColor: `var(--danger)`, width: "50%" }}
          disabled={isCancellingOrder}
        >
          {isCancellingOrder ? "Cancelling..." : "Cancel order"}
        </button>
        {isCancellingOrderSuccess ? (
          <StatusNotification
            type={"success"}
            message={`Order cancelled successfully... A refund will be initiated and the order amount -20% paid to your payment account.`}
          />
        ) : isCancellingOrderError ? (
          <StatusNotification
            type={"error"}
            message={
              cancellationError?.response?.data?.error
                ? `We could not cancel your order. Reason: ${cancellationError?.response?.data?.error} `
                : `We could not cancel your order. Reason: ${cancellationError?.message}`
            }
          />
        ) : null}
      </form>
    </div>
  );
}

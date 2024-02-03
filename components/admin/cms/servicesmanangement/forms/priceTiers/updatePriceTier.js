import Joi from "joi-browser";
import { useState } from "react";
import { FaMinusCircle, FaTasks } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import styles from "../../../../../../styles/admin/Forms.module.css";
import { GeneralTextInput } from "../../../../../ui-fragments/input.jsx";
import { StatusNotification } from "../../../../../ui-fragments/notification";
import { GeneralSelectInput } from "../../../../../ui-fragments/select";
import RichTextEditor from "../../../../../ui-fragments/textEditor";
import validation from "../../../../../utils/helpers/validation";
import {
  AddPriceTierHook,
  UpdatePricingHook,
} from "../../../../../utils/hooks/serviceMgmtHook";
import { CloseButton } from "../../../../Globals/closeBtn";

export default function UpdateServicePriceTier({
  __selected_tier,
  subServices,
  closeForm,
}) {
  //get selected row data

  //form states
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    tier_name: __selected_tier?.tier_name,
    price: __selected_tier?.price,
    active: __selected_tier?.active,
  });
  const [formattedContent, setFormattedContent] = useState(
    __selected_tier?.description
  );

  const [costParameters, setCostParameters] = useState(
    __selected_tier?.cost_parameters
  );

  const addMoreParamaters = () => {
    setCostParameters([
      ...costParameters,
      {
        name: "",
        unitPrice: 0,
        unitType: "",
        min: 1,
        max: 1,
        duration: 0,
      },
    ]);
  };

  const removeParamaters = (i) => {
    let newParams = [...costParameters];
    const paramsAfterRmoval = newParams.filter(function (params) {
      return params !== newParams[i];
    });
    setCostParameters(paramsAfterRmoval);
  };

  const parameterValueChanges = (e, i) => {
    let newParams = [...costParameters];
    newParams[i][e.target.name] = e.target.value;
    setCostParameters(newParams);
  };

  //defined validation schema
  const schema = {
    tier_name: Joi.string().required(),
    price: Joi.string().required(),
    active: Joi.boolean().required(),
  };

  //Form inputs event handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestBody = {
    id: __selected_tier?._id,
    tier_name: formData?.tier_name,
    description: formattedContent,
    price: formData?.price,
    active: Boolean(formData?.active),
    cost_parameters: costParameters,
  };

  //function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-->", requestBody);
    const errors = validation(formData, schema);
    setErrors(errors || {});
    if (!errors) {
      addServicePriceRequest(requestBody);
    } else {
      console.log(errors);
    }
  };

  //add price tier
  const onSuccess = () => {};

  const onError = (error) => {
    console.log("error: ", error.message);
  };

  const {
    mutate: addServicePriceRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = UpdatePricingHook(onSuccess, onError);

  if (isSuccess) {
    closeForm();
  }
  return (
    <div className={""} style={{ width: "100%" }}>
      <div className={styles.authForm}>
        <div className={styles.authFormHeader}>
          <div style={{ margin: "0.5rem 0" }}></div>
          <FaTasks size={25} />
          <h4>
            {isLoading ? (
              "Updating price tier..."
            ) : isSuccess ? (
              <StatusNotification
                type={"success"}
                message={"Price tier updated successfully..."}
              />
            ) : isError ? (
              <StatusNotification
                type={"error"}
                message={error?.response?.data?.error ?? error?.message}
              />
            ) : (
              "Update price tier"
            )}
          </h4>
          <CloseButton
            style={styles.closeBtn}
            closeFunc={closeForm}
            disabled={isLoading}
          />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <GeneralTextInput
            label={"Pricing name/title"}
            placeholder={"Pricing name goes here"}
            type={"text"}
            name={"tier_name"}
            onChange={handleChange}
            defaultValue={formData?.tier_name}
            validate={errors}
            readOnly={isLoading}
          />
          <small className="field-validation">
            {errors.tier_name && "Pricing name/title is required"}
          </small>
          {/*price tier description*/}
          <label
            className="label"
            style={{
              display: "flex",
              width: "90%",
              fontSize: `var(--text-nm)`,
              fontWeight: "700",
            }}
          >
            Description &nbsp;
            {<small className="field-validation"> *</small>}
          </label>
          <div className={"richtextWrapper"}>
            <RichTextEditor
              placeholder={"Price tier description goes here..."}
              formattedContent={formattedContent}
              setFormattedContent={setFormattedContent}
            />
            <small className="field-validation">
              {!formattedContent && "Price tier description is required"}
            </small>
          </div>
          <GeneralTextInput
            label={"Base pricing value"}
            placeholder={"Pricing value"}
            type={"text"}
            name={"price"}
            step={0.01}
            onChange={handleChange}
            defaultValue={formData?.price}
            validate={errors}
            readOnly={isLoading}
          />
          <small className="field-validation">
            {errors.price &&
              "Price value is required and must be greater than 0"}
          </small>
          <GeneralSelectInput
            label={"Pricing status"}
            name={"active"}
            defaultValue={formData.active}
            disabledDescription={"pricing status"}
            options={[
              { val: true, name: "Active" },
              { val: false, name: "Inactive" },
            ]}
            onChange={handleChange}
            validate={errors}
          />
          <small className="field-validation">
            {errors.active && "Status is required"}
          </small>

          {/*Cost paramaters*/}
          <label style={{ fontWeight: "bolder" }}>Cost parameters</label>
          {costParameters?.map((param, i) => {
            return (
              <div
                key={i + 1}
                className={"formGroupWrapper"}
                style={{
                  width: "100%",
                  padding: "0.65rem 0",
                  borderBottom: "1pt solid var(--green-dark)",
                  rowGap: "0.35rem",
                }}
              >
                <GeneralTextInput
                  label={"Parameter name/title"}
                  placeholder={"Eg: Bedroom"}
                  type={"text"}
                  name={"name"}
                  onChange={(e) => parameterValueChanges(e, i)}
                  defaultValue={param?.name}
                  readOnly={isLoading}
                />
                <br></br>
                <div className={"grid-col-2"}>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Unit type"}
                      placeholder={"Eg: cm, km, 1/2"}
                      type={"text"}
                      name={"unitType"}
                      onChange={(e) => parameterValueChanges(e, i)}
                      defaultValue={param?.unitType}
                      // validate={errors}
                      readOnly={isLoading}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Unit Price"}
                      placeholder={"Eg: 20.00"}
                      type={"number"}
                      name={"unitPrice"}
                      onChange={(e) => parameterValueChanges(e, i)}
                      validate={errors}
                      defaultValue={param?.unitPrice}
                      readOnly={isLoading}
                    />
                  </div>

                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Minimum"}
                      placeholder={"Minimun value"}
                      type={"number"}
                      name={"min"}
                      onChange={(e) => parameterValueChanges(e, i)}
                      defaultValue={param?.min}
                      // validate={errors}
                      readOnly={isLoading}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Maximum"}
                      placeholder={"Maximum value"}
                      type={"number"}
                      name={"max"}
                      onChange={(e) => parameterValueChanges(e, i)}
                      defaultValue={param?.max}
                      // validate={errors}
                      readOnly={isLoading}
                    />
                  </div>
                  <div className={"formGroupWrapper"}>
                    <GeneralTextInput
                      label={"Duration (minutes)"}
                      placeholder={"Cost duration"}
                      type={"number"}
                      name={"duration"}
                      min={0}
                      onChange={(e) => parameterValueChanges(e, i)}
                      defaultValue={param?.duration}
                      // validate={errors}
                      readOnly={isLoading}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => removeParamaters(i)}
                    style={{
                      alignItems: "flex-end",
                      width: "max-content",
                      height: "max-content",
                    }}
                  >
                    <FaMinusCircle size={25} color="red" />
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            <button type="button" onClick={() => addMoreParamaters()}>
              <MdOutlineAddCircle size={25} color="green" />
            </button>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Updating price tier price tier..." : "Update pricing"}
          </button>
        </form>
      </div>
    </div>
  );
}

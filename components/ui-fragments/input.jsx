import { FaEye, FaEyeSlash } from "react-icons/fa";

export const GeneralTextInput = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  readOnly,
  defaultValue,
  required,
  min,
  value,
}) => {
  return (
    <div className="input-container formGroup">
      <label className="label">
        {label}
        {required && <small className="field-validation"> *</small>}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        min={min}
        name={name}
        className=""
        onChange={onChange}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
};

export const GeneralDecimalInput = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  readOnly,
  defaultValue,
  required,
  step,
  min,
  value,
}) => {
  return (
    <div className="input-container formGroup">
      <label className="label">
        {label}
        {required && <small className="field-validation"> *</small>}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        min={min}
        name={name}
        className=""
        onChange={onChange}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={value}
        step={step}
      />
    </div>
  );
};

export const GeneralPasswordInput = ({
  label,
  placeholder,
  id,
  onChange,
  showPassword,
  togglePasswordShow,
  name,
  readOnly,
  defaultValue,
  required,
}) => {
  return (
    <div className="password-container formGroup">
      <label className="label">
        {label}
        {required && <small className="field-validation">*</small>}
      </label>
      <div className="password-wrapper">
        <input
          placeholder={placeholder}
          className=""
          id={id}
          type={"password"}
          name={name}
          onChange={onChange}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
        <button
          onClick={togglePasswordShow}
          type="button"
          className="password-toggle"
          title="show-password"
        >
          {showPassword ? <FaEyeSlash size={30} /> : <FaEye size={25} />}
        </button>
      </div>
    </div>
  );
};

export const GeneralTextAreaInput = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  readOnly,
  defaultValue,
  required,
}) => {
  return (
    <div className="textarea-container formGroup">
      <label className="">
        {label}
        {required && <small className="field-validation"> *</small>}
      </label>
      <textarea
        placeholder={placeholder}
        type={type}
        name={name}
        className=""
        onChange={onChange}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </div>
  );
};

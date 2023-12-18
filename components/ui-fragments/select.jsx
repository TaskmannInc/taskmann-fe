export const GeneralSelectInput = ({
  label,
  name,
  options,
  disabled,
  defaultValue,
  disabledDescription,
  onChange,
  required,
}) => {
  return (
    <div className="select-container formGroup">
      <label className="label">
        {label} {required && <small className="field-validation"> *</small>}
      </label>
      <div className="select-wrapper">
        <select
          className=""
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          <option defaultValue={true} value={null}>
            --Select {disabledDescription}--
          </option>
          {options?.map((opt, index) => {
            return (
              <option key={index + 1} value={opt?.val}>
                {opt?.name}
              </option>
            );
          })}
        </select>
        {/* <button></button> */}
      </div>
    </div>
  );
};

export const GenericInput = ({ label, type, placeholder, handleChange }) => {
  return (
    <div className={"formGroup"}>
      <label>{label}</label>
      <input
        type={type}
        className={"styles.textInput"}
        onChange={handleChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

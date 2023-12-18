export const GenericSelectInput = ({
  label,
  placeholder,
  handleChange,
  name,
}) => {
  return (
    <div className={"select-container formGroup"}>
      <label>{label}</label>
      <select
        name={name}
        className={"styles.selectInput"}
        onChange={handleChange}
        placeholder={placeholder}
      >
        {options?.map((opt, index) => {
          return <option key={index + 1}>{opt?.name}</option>;
        })}
      </select>
    </div>
  );
};

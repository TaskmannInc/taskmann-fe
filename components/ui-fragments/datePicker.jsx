import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerInstance = ({
  showWeekNumbers,
  selected,
  startDate,
  endDate,
  onDateChange,
  placehoderText,
  selectsRange,
  showTimeSelect,
  dateFormat,
  timeIntervals,
  minDate,
  maxDate,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onDateChange}
      startDate={startDate}
      endDate={endDate}
      placeholderText={placehoderText ?? "Select a date"}
      className={"date-picker"}
      selectsRange={selectsRange}
      showTimeSelect={showTimeSelect}
      timeIntervals={timeIntervals}
      minDate={minDate}
      maxDate={maxDate}
      showWeekNumbers
      dateFormat={dateFormat}
    />
  );
};

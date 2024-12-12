import { DatePicker } from "@mui/x-date-pickers";

const DatePickerInput = ({value, setValue, validate, error, setError, maxDate}) => {

  const handleError = (newError) => {
    if (newError === "maxDate") {
        validate()
        return
    }
    // default
    setError("");
  };

  return (
    <DatePicker
      value={value}
      onChange={val => setValue(val)}
      label="Date of birth"
      maxDate={maxDate}
      format="YYYY-MM-DD"
      onError={(newError) => handleError(newError)}
      slotProps={{
        textField: {
          helperText: error,
        },
      }}
    />
  );
};

export default DatePickerInput;

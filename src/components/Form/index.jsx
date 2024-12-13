import { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  FormGroup,
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import TextInput from "../TextInput";
import DatePickerInput from "../DatePickerInput";
import axios from "axios";

const yesterday = dayjs().subtract(1, "day");
const eighteen = dayjs().subtract(18, "year");

const Form = () => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [dob, setDob] = useState(dayjs("2000-01-01"));
  const [dobErr, setDobErr] = useState("");

  const [termsChecked, setTermsChecked] = useState(false);

  const [submittedMsg, setSubmittedMsg] = useState("");

  const validateName = () => {
    if (name.length > 100) {
      setNameErr("Max. character length is 100");
    }
    if (!name) {
      setNameErr("This field is required");
    }
  };

  const validateDob = () => {
    // future date error
    if (dob > yesterday) {
      setDobErr("Date of birth cannot be future date");
      return;
    }
    // under 18 error
    if (dob > eighteen) {
      setDobErr("Minimum age is 18");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateName();
    validateDob();
    if (!!nameErr || !!dobErr || !termsChecked || !dob.isValid()) {
      console.log("not valid");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/users", {
        name,
        dob,
      });
      if (res.data) {
        setSubmittedMsg("Thank you for your submission");
      }
    } catch (err) {
      setSubmittedMsg("We regret that this service is currently unavailable");
    }
  };

  const shouldDisableField =
    !name || !dob || !!nameErr || !!dobErr || !dob.isValid();

  return (
    <form onSubmit={handleSubmit}>
      <Stack width="500px" spacing={2}>
        <TextInput
          name="Name"
          value={name}
          setValue={setName}
          error={nameErr}
          setError={setNameErr}
          validate={validateName}
          required
        />

        <DatePickerInput
          value={dob}
          setValue={setDob}
          validate={validateDob}
          error={dobErr}
          setError={setDobErr}
          maxDate={eighteen}
        />
        <FormGroup>
          <FormControlLabel
            label="Accept terms and conditions"
            control={
              <Checkbox
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                required
                disabled={shouldDisableField}
              />
            }
          />
        </FormGroup>
        <Button
          variant="outlined"
          type="submit"
          disabled={shouldDisableField || !termsChecked}
        >
          Submit
        </Button>
        {!!submittedMsg && <Typography>{submittedMsg}</Typography>}
      </Stack>
    </form>
  );
};

export default Form;

import { AccountCircle } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { useField } from "formik";

interface TextInputProps {
  name: string;
  label: string;
  "data-cy"?: string;
}

function InputField(props: TextInputProps) {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputField;

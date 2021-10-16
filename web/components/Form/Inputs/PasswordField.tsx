import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

interface TextInputProps {
  name: string;
  label: string;
  noIcon?: boolean;
  "data-cy"?: string;
}

function PasswordInput({ noIcon, ...props }: TextInputProps) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: !noIcon ? (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ) : undefined,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword} edge="end" size="large">
              {showPassword ? (
                <Tooltip title="Ocultar">
                  <Visibility />
                </Tooltip>
              ) : (
                <Tooltip title="Exibir">
                  <VisibilityOff />
                </Tooltip>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;

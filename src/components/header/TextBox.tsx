import { Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  placeholder: string;
  onChange?: (val: string) => void;
}

const TextBox = ({ placeholder, onChange }: IProps) => {
  // states
  const [val, setVal] = useState("");

  // effect
  useEffect(() => {
    onChange?.(val);
  }, [val]);

  return (
    <Stack justifyContent="flex-end">
      {val.length > 0 && (
        <Typography variant="body2" component="label" htmlFor="company-search">
          {placeholder}
        </Typography>
      )}
      <TextField
        id="company-search"
        type="text"
        size="small"
        placeholder={placeholder}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        sx={{
          justifyContent: "flex-end",
          "& .MuiOutlinedInput-root": {
            fontSize: "15px",
            fontWeight: 300,
            "&:hover fieldset": {
              borderColor: (theme) => theme.palette.border.hover,
            },
            "&.Mui-focused fieldset": {
              borderColor: (theme) => theme.palette.border.secondary,
            },
          },
        }}
      />
    </Stack>
  );
};

export default TextBox;

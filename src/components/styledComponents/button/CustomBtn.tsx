import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomBtn = styled(Button, {
  shouldForwardProp(propName) {
    return propName !== "bgCol" && propName !== "textCol";
  },
})<{ bgCol?: string; textCol?: string }>(({ bgCol, textCol }) => ({
  backgroundColor: bgCol,
  color: textCol,
  padding: "8px 18px",
  borderRadius: "8px",
  fontWeight: 500,
  margin: "5px 0",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: bgCol,
  },
}));

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography, alpha, useTheme } from "@mui/material";

interface IProps {
  id: string;
  label: string;
  onDelete?: (id: string) => void;
}

const FilterChip = ({ id, label, onDelete }: IProps) => {
  // hooks
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ backgroundColor: theme.palette.chip.pri, borderRadius: "2px", paddingLeft: "6px" }}
      gap="4px"
    >
      <Typography variant="caption" color={theme.palette.chip.text} fontWeight={300}>
        {label}
      </Typography>
      <IconButton
        onClick={() => onDelete?.(id)}
        sx={{
          borderRadius: "2px",
          padding: "4px",
          "&:hover": {
            backgroundColor: alpha(theme.palette.error.main, 0.2),
            "& > svg": {
              fill: theme.palette.error.main,
            },
          },
        }}
      >
        <CloseIcon sx={{ fontSize: "14px" }} />
      </IconButton>
    </Stack>
  );
};

export default FilterChip;

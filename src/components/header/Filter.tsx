import {
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import FilterChip from "./FilterChip";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import style from "./style.module.css";

interface IProps {
  placeholder: string;
  /** must be unique for every filter */
  modalId: string;
}

export interface IWithCat extends IProps {
  type: "cat";
  options: OptionsWithCat;
}

export interface IWithoutCat extends IProps {
  type: "no cat";
  options: OptionsWithoutCat;
}

type SelectedRes = {
  id: string;
  label: string;
};

type OptionsWithCat = {
  [key: string]: { label: string; id: string }[];
};

type OptionsWithoutCat = { label: string; id: string }[];

function Filter({ placeholder, modalId, options, type }: IWithCat | IWithoutCat) {
  // state
  const [selectedRes, setSelectedRes] = useState<SelectedRes[]>([]);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filters, setFilters] = useState<OptionsWithCat | OptionsWithoutCat | null>(null);

  // consts
  const showModal = Boolean(anchorEl);

  // hooks
  const theme = useTheme();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const autoComRef = useRef<HTMLDivElement | null>(null);
  const filteredRes = useMemo(() => {
    return filters ?? [];
  }, [filters]);

  // methods
  function handleFocus() {
    if (!inputRef.current) return;
    inputRef.current.focus();
    setIsFocused(true);
    setAnchorEl(autoComRef.current);
  }

  function handleClickAway() {
    setIsFocused(false);
    setAnchorEl(null);
  }

  function handleResizeModal() {
    if (!autoComRef.current) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.width = autoComRef.current.getBoundingClientRect().width + "px";
  }

  function initState() {
    setFilters(options);
  }

  function generateList(fils: OptionsWithoutCat | OptionsWithCat) {
    switch (type) {
      case "cat": {
        const tmpFils = fils as OptionsWithCat;

        return (
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {Object.keys(tmpFils).map((key, i) => (
              <Fragment key={key + i}>
                <ListSubheader sx={{ position: "static" }}>{key}</ListSubheader>
                {tmpFils[key].map((filter) => (
                  <ListItemButton key={filter.id}>
                    <ListItemText primary={filter.label} />
                  </ListItemButton>
                ))}
              </Fragment>
            ))}
          </List>
        );
      }
      case "no cat": {
        const tmpFils = fils as OptionsWithoutCat;

        return (
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {tmpFils.map((filter) => (
              <ListItemButton key={filter.id}>
                <ListItemText primary={filter.label} />
              </ListItemButton>
            ))}
          </List>
        );
      }
      default:
        break;
    }
  }

  // effects
  useEffect(() => {
    initState();
  }, []);

  useLayoutEffect(() => {
    handleResizeModal();
  }, [value, isFocused]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Stack
          ref={autoComRef}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            minHeight: "38px",
            outline: isFocused
              ? `2px solid ${theme.palette.border.secondary}`
              : `1px solid ${theme.palette.border.main}`,
            paddingX: "0.5rem",
            borderRadius: "4px",
            minWidth: "150px",
            transition: "border-color 100ms ease",
            "&:hover": {
              outlineColor: isFocused ? theme.palette.border.secondary : theme.palette.border.hover,
            },
          }}
          onClick={handleFocus}
        >
          {selectedRes.length > 0 && (
            <Stack direction="row" alignItems="center" gap="5px">
              {selectedRes.map((res) => (
                <FilterChip key={res.id} {...res} />
              ))}
            </Stack>
          )}

          <Typography
            ref={inputRef}
            component="input"
            variant="body2"
            placeholder={placeholder}
            className={`${style["autocomplete-input"]}`}
            fontWeight={300}
            size={value.length > 0 ? value.length - 1 : placeholder?.length - 1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ cursor: "default" }}
          />

          <Stack direction="row" alignItems="center" gap="7px">
            {selectedRes.length > 0 && (
              <IconButton
                sx={{
                  padding: "8px 0",
                  borderRadius: "0",
                  "&:hover": {
                    backgroundColor: "transparent",
                    "& > svg": {
                      fill: theme.palette.chip.text,
                    },
                  },
                }}
              >
                <CloseIcon
                  fontSize="small"
                  htmlColor={isFocused ? theme.palette.chip.text : theme.palette.border.main}
                />
              </IconButton>
            )}
            <Divider orientation="vertical" sx={{ height: "20px" }} />
            <IconButton
              sx={{
                padding: "8px 0",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "transparent",
                  "& > svg": {
                    fill: theme.palette.chip.text,
                  },
                },
              }}
            >
              <KeyboardArrowDownIcon
                fontSize="small"
                htmlColor={isFocused ? theme.palette.chip.text : theme.palette.border.main}
              />
            </IconButton>
          </Stack>
        </Stack>

        <Popper
          id={modalId}
          open={showModal}
          anchorEl={anchorEl}
          placement="bottom"
          disablePortal
          sx={{
            marginTop: "10px !important",
          }}
        >
          <Paper elevation={1}>{generateList(filteredRes)}</Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

export default Filter;

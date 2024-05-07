import {
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment, MouseEvent, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import FilterChip from "./FilterChip";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import style from "./style.module.css";

type IProps<T extends boolean = false> = {
  placeholder: string;
  /**
   * Setting this prop results in the autocomplete to switch from single select to multi select
   * @default false
   */
  single: T;
  onChange?: (filters: T extends true ? Filter : Filter[]) => void;
};

export type IWithCat = {
  type: "cat";
  options: OptionsWithCat;
} & (IProps<true> | IProps<false>);

export type IWithoutCat = {
  type: "no cat";
  options: OptionsWithoutCat;
} & (IProps<true> | IProps<false>);

type Filter = { label: string; id: string };

type OptionsWithCat = {
  [key: string]: Filter[];
};

type OptionsWithoutCat = Filter[];

function Filter({ placeholder, options, type, single, onChange }: IWithCat | IWithoutCat) {
  // state
  const [selectedRes, setSelectedRes] = useState<Filter[]>([]);
  const [value, setValue] = useState("");
  const [singleValue, setSingleValue] = useState<Filter>({ id: "", label: "" });
  const [isFocused, setIsFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filters, setFilters] = useState<OptionsWithCat | OptionsWithoutCat | null>(null);

  // consts
  const showModal = Boolean(anchorEl);

  // hooks
  const modalId = useId(); // generated id to uniquely identify every modal, used in resizing modal.
  const theme = useTheme();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const autoComRef = useRef<HTMLDivElement | null>(null);
  const filteredRes = useMemo(handleFilterList, [filters, selectedRes, value, singleValue]);

  // methods
  function handleFocus() {
    inputRef.current?.focus();
    setIsFocused(true);
    setAnchorEl((prev) => (prev ? null : autoComRef.current));
  }

  function handleClickAway() {
    setIsFocused(false);
    setAnchorEl(null);
  }

  /**
   * Handler to resize the modal based on the parent
   * @returns void
   */
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
            {Object.keys(tmpFils).length ? (
              Object.keys(tmpFils).map((key, idx) => (
                <Fragment key={key + idx}>
                  <ListSubheader disableSticky sx={{ lineHeight: "28px" }}>
                    {key}
                  </ListSubheader>
                  {tmpFils[key].map((filter, i) => (
                    <ListItemButton
                      onClick={() => handleAddSelectedRes(filter)}
                      key={filter.id}
                      sx={{
                        marginBottom:
                          idx !== Object.keys(tmpFils).length - 1 && i === tmpFils[key].length - 1 ? "1rem" : "0",
                        paddingY: "5px",
                      }}
                    >
                      <ListItemText
                        primary={filter.label}
                        primaryTypographyProps={{
                          fontSize: "14px",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No Options"
                  primaryTypographyProps={{
                    fontSize: "14px",
                  }}
                />
              </ListItem>
            )}
          </List>
        );
      }
      case "no cat": {
        const tmpFils = fils as OptionsWithoutCat;

        return (
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {tmpFils.length > 0 ? (
              tmpFils.map((filter) => (
                <ListItemButton onClick={() => handleAddSelectedRes(filter)} key={filter.id} sx={{ paddingY: "5px" }}>
                  <ListItemText
                    primary={filter.label}
                    primaryTypographyProps={{
                      fontSize: "14px",
                    }}
                  />
                </ListItemButton>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No Options"
                  primaryTypographyProps={{
                    fontSize: "14px",
                  }}
                />
              </ListItem>
            )}
          </List>
        );
      }
      default:
        break;
    }
  }

  function handleAddSelectedRes(filter: Filter) {
    if (single) {
      setSingleValue({ id: filter.id, label: filter.label });
    } else {
      setSelectedRes((prev) => [...prev, filter]);
      setValue("");
    }
    setAnchorEl(null);
  }

  function handleDeleteSelectedRes(filter: Filter) {
    const selRes = structuredClone(selectedRes);
    const idx = selRes.findIndex((el) => el.id === filter.id && el.label === filter.label);

    if (!inputRef.current) return;
    if (idx < 0) return;

    selRes.splice(idx, 1);
    setSelectedRes(selRes);

    inputRef.current.focus();
    setIsFocused(true);
    setAnchorEl(null);
  }

  function handleFilterList() {
    if (filters === null) return [];

    switch (type) {
      case "cat": {
        const tmpFils = structuredClone(filters) as IWithCat["options"];
        const res = {} as IWithCat["options"];

        selectedRes.forEach((res) => {
          Object.values(tmpFils).forEach((val) => {
            const idx = val.findIndex((v) => v.id === res.id && v.label === res.label);
            if (idx > -1) {
              val.splice(idx, 1);
            }
          });
        });

        if (value.trim().length > 0) {
          Object.keys(tmpFils).forEach((key) =>
            tmpFils[key].forEach((el) => {
              const idx = el.label.toLowerCase().indexOf(value.toLowerCase());

              if (idx > -1) {
                if (res[key] === undefined) {
                  res[key] = [];
                }
                res[key].push({ id: el.id, label: el.label });
              }
            })
          );

          return res;
        }

        return tmpFils;
      }
      case "no cat": {
        const tmpFils = structuredClone(filters) as IWithoutCat["options"];
        const res = [] as IWithoutCat["options"];

        if (single && singleValue.label.trim().length > 0) {
          tmpFils.forEach((fil, i) => {
            if (fil.label === singleValue.label) {
              tmpFils.splice(i, 1);
            }
          });

          return tmpFils;
        } else {
          selectedRes.forEach((res) => {
            tmpFils.forEach((fil, i) => {
              if (fil.id === res.id && fil.label === res.label) {
                tmpFils.splice(i, 1);
              }
            });
          });
        }

        if (value.trim().length > 0) {
          tmpFils.forEach((fil) => {
            if (fil.label.toLowerCase().indexOf(value.toLowerCase()) > -1) {
              res.push(fil);
            }
          });

          return res;
        }

        return tmpFils;
      }
    }
  }

  function handleClearAllFilters(_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    setSelectedRes([]);
    inputRef.current?.focus();
    setSingleValue({ id: "", label: "" });
    setValue("");
    setIsFocused(true);
  }

  // effects
  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    if (single) onChange?.(singleValue);
    else onChange?.(selectedRes);
  }, [selectedRes, singleValue.label]);

  useLayoutEffect(() => {
    handleResizeModal();
  }, [value, isFocused, selectedRes, anchorEl]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack height="59px" justifyContent="flex-end">
        {(selectedRes.length > 0 || singleValue.label.length > 0 || value.length > 0) && (
          <Typography variant="body2">{placeholder}</Typography>
        )}
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
          {selectedRes.length > 0 && !single && (
            <Stack direction="row" alignItems="center" gap="5px">
              {selectedRes.map((res, i) => (
                <FilterChip key={res.id + i} {...res} onDelete={handleDeleteSelectedRes} />
              ))}
            </Stack>
          )}

          <Typography
            ref={inputRef}
            component="input"
            variant="body2"
            placeholder={selectedRes.length > 0 ? undefined : placeholder}
            className={`${style["autocomplete-input"]}`}
            fontWeight={300}
            size={
              singleValue.label.length > 0
                ? singleValue.label.length
                : selectedRes.length > 0
                ? 1
                : placeholder?.length - 0.5
            }
            value={singleValue.label || value}
            onChange={(e) => {
              setValue(e.target.value);
              setSingleValue({ id: "", label: "" });
            }}
          />

          <Stack direction="row" alignItems="center" gap="7px">
            {(selectedRes.length > 0 || singleValue.label.length > 0 || value.length > 0) && (
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
                onClick={handleClearAllFilters}
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
            zIndex: 10,
          }}
        >
          <Paper elevation={2}>{generateList(filteredRes)}</Paper>
        </Popper>
      </Stack>
    </ClickAwayListener>
  );
}

export default Filter;

import { Stack } from "@mui/material";
import Filter from "./Filter";
import { Exp, MinBasePay, NumOfEmp, Remote, Roles, TechStack } from "../../constants/filters";
import TextBox from "./TextBox";
import { useAppDispatch } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { companyName, location, minBasePay, minExp, roles } from "../../features/filters";
import { useDebounce } from "../../hooks/useDebounce";

const Header = () => {
  // states
  const [isEngFilterSelected, setIsEngFilterSelected] = useState(false);
  const [comName, setComName] = useState("");

  // hooks
  const dispatch = useAppDispatch(); // typed dispatch hook for redux
  const debouncedVal = useDebounce(comName, 500);

  // methods
  function handleOnRolesChange(filters: Filter[]) {
    if (filters.some((fil) => Roles["Engineering"].some((role) => role.id === fil.id && role.label === fil.label))) {
      setIsEngFilterSelected(true);
    } else {
      setIsEngFilterSelected(false);
    }

    dispatch(roles(filters));
  }

  function handleMinExpChange(filter: Filter) {
    dispatch(minExp(filter));
  }

  function handleLocChange(filters: Filter[]) {
    dispatch(location(filters));
  }

  function handleMinBasePay(filter: Filter) {
    dispatch(minBasePay(filter));
  }

  function handleComName(query: string) {
    dispatch(companyName(query));
  }

  // effects
  useEffect(() => {
    handleComName(debouncedVal);
  }, [debouncedVal]);

  return (
    <Stack direction="row" gap="1rem" flexWrap="wrap">
      <Filter placeholder="Roles" type="cat" options={Roles} single={false} onChange={handleOnRolesChange} />
      <Filter placeholder="Number Of Employees" type="no cat" options={NumOfEmp} single={false} />
      <Filter placeholder="Minimum Experience" type="no cat" options={Exp} single onChange={handleMinExpChange} />
      <Filter placeholder="Location" type="no cat" options={Remote} single={false} onChange={handleLocChange} />
      {isEngFilterSelected && <Filter placeholder="Tech Stack" type="no cat" options={TechStack} single={false} />}
      <Filter
        placeholder="Minimum Base Pay Salary"
        type="no cat"
        options={MinBasePay}
        single
        onChange={handleMinBasePay}
      />
      <TextBox placeholder="Search Company Name" onChange={(val) => setComName(val)} />
    </Stack>
  );
};

export default Header;

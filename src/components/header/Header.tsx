import { Stack } from "@mui/material";
import Filter from "./Filter";
import { Exp, MinBasePay, NumOfEmp, Remote, Roles, TechStack } from "../../constants/filters";
import TextBox from "./TextBox";
import { useAppDispatch } from "../../hooks/useStore";
import { useState } from "react";

const Header = () => {
  // states
  const [isEngFilterSelected, setIsEngFilterSelected] = useState(false);

  // hooks
  const dispatch = useAppDispatch();

  // methods
  function handleOnRolesChange(filters: Filter[]) {}

  return (
    <Stack direction="row" gap="1rem" flexWrap="wrap">
      <Filter placeholder="Roles" type="cat" options={Roles} single={false} onChange={(f) => console.log(f)} />
      <Filter
        placeholder="Number Of Employees"
        type="no cat"
        options={NumOfEmp}
        single={false}
        onChange={(f) => console.log(f)}
      />
      <Filter placeholder="Minimum Experience" type="no cat" options={Exp} single onChange={(f) => console.log(f)} />
      <Filter placeholder="Location" type="no cat" options={Remote} single={false} onChange={(f) => console.log(f)} />
      {isEngFilterSelected && (
        <Filter
          placeholder="Tech Stack"
          type="no cat"
          options={TechStack}
          single={false}
          onChange={(f) => console.log(f)}
        />
      )}
      <Filter
        placeholder="Minimum Base Pay Salary"
        type="no cat"
        options={MinBasePay}
        single
        onChange={(f) => console.log(f)}
      />
      <TextBox placeholder="Search Company Name" onChange={(f) => console.log(f)} />
    </Stack>
  );
};

export default Header;

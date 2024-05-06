import { Stack } from "@mui/material";
import Filter from "./Filter";
import { Exp, MinBasePay, NumOfEmp, Remote, Roles } from "../../constants/filters";

const Header = () => {
  return (
    <Stack direction="row" gap="1rem" flexWrap="wrap">
      <Filter placeholder="Roles" type="cat" options={Roles} />
      <Filter placeholder="Number Of Employees" type="no cat" options={NumOfEmp} />
      <Filter placeholder="Experience" type="no cat" options={Exp} single/>
      <Filter placeholder="Remote" type="no cat" options={Remote} />
      <Filter placeholder="Minimum Base Pay Salary" type="no cat" options={MinBasePay} single/>
    </Stack>
  );
};

export default Header;

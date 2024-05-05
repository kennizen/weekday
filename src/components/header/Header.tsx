import { Stack } from "@mui/material";
import Filter from "./Filter";
import { Exp, MinBasePay, NumOfEmp, Remote, Roles } from "../../constants/filters";

const Header = () => {
  return (
    <Stack direction="row" gap="1rem" flexWrap="wrap">
      <Filter placeholder="Roles" modalId="1" type="cat" options={Roles} />
      <Filter placeholder="Number Of Employees" modalId="2" type="no cat" options={NumOfEmp} />
      <Filter placeholder="Experience" modalId="3" type="no cat" options={Exp} />
      <Filter placeholder="Remote" modalId="4" type="no cat" options={Remote} />
      <Filter placeholder="Minimum Base Pay Salary" modalId="5" type="no cat" options={MinBasePay} />
    </Stack>
  );
};

export default Header;

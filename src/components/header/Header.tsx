import { Stack } from "@mui/material";
import Filter from "./Filter";
import { Exp, MinBasePay, NumOfEmp, Remote, Roles } from "../../constants/filters";
import TextBox from "./TextBox";

const Header = () => {
  return (
    <Stack direction="row" gap="1rem" flexWrap="wrap">
      <Filter placeholder="Roles" type="cat" options={Roles} />
      <Filter placeholder="Number Of Employees" type="no cat" options={NumOfEmp} />
      <Filter placeholder="Minimum Experience" type="no cat" options={Exp} single />
      <Filter placeholder="Location" type="no cat" options={Remote} />
      <Filter placeholder="Minimum Base Pay Salary" type="no cat" options={MinBasePay} single />
      <TextBox placeholder="Search Company Name"/>
    </Stack>
  );
};

export default Header;

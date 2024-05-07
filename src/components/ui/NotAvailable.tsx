import { Box, Stack, Typography } from "@mui/material";
import notFoundImg from "../../assets/images/nothing-found.4d8f334c.png";

const NotAvailable = () => {
  return (
    <Stack mt="2rem" sx={{ height: "100%" }} justifyContent="center" alignItems="center" gap="1rem">
      <Box width={150} height={150}>
        <img src={notFoundImg} alt="not found image" loading="lazy" width="100%" height="100%" />
      </Box>
      <Typography fontWeight={700}>No jobs available for this category at the moment</Typography>
    </Stack>
  );
};

export default NotAvailable;

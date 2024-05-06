import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CustomBtn } from "../styledComponents/button/CustomBtn";
import { Job } from "./JobCards";

interface IProps {
  job: Job;
}

const JobCard = ({ job }: IProps) => {
  // hooks
  const theme = useTheme();

  return (
    <Stack
      sx={{
        maxWidth: 360,
        width: "100%",
        padding: "1rem 1rem 0.5rem 1rem",
        boxShadow: theme.shadows[3],
        borderRadius: "20px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          padding: "0.1rem 0.6rem",
          border: `1px solid ${theme.palette.border.main}`,
          borderRadius: "50px",
          width: "fit-content",
          boxShadow: theme.shadows[1],
        }}
        mb="1rem"
      >
        <Typography variant="caption">⌛ Posted 10 days ago</Typography>
      </Stack>

      <Stack direction="row" gap="0.5rem" mb="0.7rem">
        <Stack sx={{ width: 40, height: 40 }}>
          <img src={job.logoUrl} alt="job logo" loading="lazy" fetchpriority="low" />
        </Stack>
        <Stack>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {job.companyName}
          </Typography>
          <Typography sx={{ textTransform: "capitalize" }}>{job.jobRole}</Typography>
          <Stack direction="row" alignItems="center" gap="0.3rem">
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              {job.location}
            </Typography>
            |<Typography variant="caption">Exp: {`${job.minExp}-${job.maxExp}`} years</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography variant="body2" fontWeight={300} color={theme.palette.specialText.main} mb="0.5rem">
        Estimated salary ${`${job.minJdSalary} - ${job.maxJdSalary}`} KPA ✅
      </Typography>

      <Typography>About Company:</Typography>
      <Typography variant="body2" fontWeight={500}>
        About us
      </Typography>

      <Box sx={{ height: "15rem", position: "relative", overflow: "hidden" }}>
        <Typography variant="body2">{job.jobDetailsFromCompany}</Typography>
        <Stack
          alignItems="center"
          justifyContent="flex-end"
          pb="2rem"
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))",
          }}
        >
          <Typography
            component="a"
            href={job.jdLink}
            variant="body2"
            fontWeight={300}
            color={theme.palette.border.secondary}
            sx={{ textDecoration: "none" }}
          >
            View job
          </Typography>
        </Stack>
      </Box>

      <Typography variant="body2" color={theme.palette.text.secondary} sx={{ letterSpacing: 1 }}>
        Minimum Experience
      </Typography>
      <Typography variant="body2" mb="0.5rem">
        {job.minExp} years
      </Typography>

      <CustomBtn bgCol={theme.palette.btn.pri} textCol="black">
        ⚡ Easy Apply
      </CustomBtn>
      <CustomBtn bgCol={theme.palette.btn.sec} textCol="white">
        Unlock referral asks
      </CustomBtn>
    </Stack>
  );
};

export default JobCard;

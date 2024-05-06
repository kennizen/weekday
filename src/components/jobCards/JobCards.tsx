import { Grid } from "@mui/material";
import JobCard from "./JobCard";

const JobCards = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <JobCard />
      </Grid>
    </Grid>
  );
};

export default JobCards;

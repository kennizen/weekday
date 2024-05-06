import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import JobCard from "./JobCard";
import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../../apis/queries";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export type Job = {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
};

export type JobList = {
  jdList: Job[];
  totalCount: number;
};

const JobCards = () => {
  // states
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // hooks
  const { isIntersecting, ref: observerRef } = useIntersectionObserver({ threshold: 0.3 });

  // consts
  const filteredJobs = useMemo(() => {
    return jobs;
  }, [jobs]);

  // methods
  async function getJobsFromApi() {
    setLoading(true);

    const [data, err] = await getJobs<JobList>(pageNo - 1);

    setLoading(false);

    if (err) {
      console.log(err);
      return;
    }

    const res: Job[] = [];

    data.jdList.forEach((job) => {
      if (Object.values(job).every((val) => val !== null)) {
        res.push(job);
      }
    });

    setJobs((prev) => [...prev, ...res]);
  }

  // effects
  useEffect(() => {
    getJobsFromApi();
  }, [pageNo]);

  useEffect(() => {
    if (!isIntersecting) return;
    setPageNo((prev) => prev + 1);
  }, [isIntersecting]);

  console.log("jobs", jobs);

  return (
    <>
      <Grid container spacing={4} mb="1rem" mt="2rem">
        {filteredJobs.map((job, i) => (
          <Grid key={job.jdUid + i} item xs={12} sm={6} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Stack width="100%" direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
          <Typography variant="body2">Loading</Typography>
          <CircularProgress size={20} />
        </Stack>
      )}
      {filteredJobs.length > 0 && <div ref={observerRef} style={{ width: "100%", height: 10 }}></div>}
    </>
  );
};

export default JobCards;

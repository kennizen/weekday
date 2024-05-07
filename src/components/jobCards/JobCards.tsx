import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import JobCard from "./JobCard";
import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../../apis/queries";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useAppSelector } from "../../hooks/useStore";
import { filterJobs } from "../../utils/filterJobs";
import NotAvailable from "../ui/NotAvailable";

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
  const [isParentScrollable, setIsParentScrollable] = useState(false);

  // hooks
  const { isIntersecting, ref: observerRef } = useIntersectionObserver({ threshold: 0.3 });
  const filters = useAppSelector((state) => state.filters); // types selector for redux

  // consts
  const filteredJobs = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);

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

    data.jdList.forEach((job, i) => {
      if (Object.values(job).every((val) => val !== null)) {
        const j: Job = { ...job, jdUid: job.jdUid + i };
        res.push(j);
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

  useEffect(() => {
    const parent = document.getElementById("job-container");

    if (!parent) return;

    if (parent.scrollHeight > parent.clientHeight) {
      setIsParentScrollable(true);
    } else {
      setIsParentScrollable(false);
    }
  }, [filteredJobs]);

  return (
    <>
      {filteredJobs.length > 0 ? (
        <Grid container spacing={4} mb="1rem" mt="2rem">
          {filteredJobs.map((job, i) => (
            <Grid key={job.jdUid + i} item xs={12} sm={6} md={4}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NotAvailable />
      )}
      {loading && (
        <Stack width="100%" direction="row" alignItems="center" justifyContent="center" gap="0.5rem">
          <Typography variant="body2">Loading</Typography>
          <CircularProgress size={20} />
        </Stack>
      )}
      {!loading && filteredJobs.length > 0 && isParentScrollable && (
        <div ref={observerRef} style={{ width: "100%", height: 10 }}></div>
      )}
    </>
  );
};

export default JobCards;

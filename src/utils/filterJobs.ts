import { RootState } from "../app/store/store";
import { Job } from "../components/jobCards/JobCards";

type QueryCombination = {
  role: string;
  minExp: number;
  loc: string;
  minBasePay: number;
  comName: string;
};

/**
 * Handler used to filter the jobs based on the selected filters by generating combinations againts all selected filters
 * @param jobs
 * @param filters
 * @returns {Job[]}
 */
export function filterJobs(jobs: Job[], filters: RootState["filters"]) {
  const res: Record<string, Job> = {};
  const queryCombs: QueryCombination[] = [];

  if (filters.roles.length > 0) {
    filters.roles.forEach((role) => {
      if (filters.location.length > 0) {
        filters.location.forEach((loc) => {
          queryCombs.push({
            role: role.label.toLowerCase(),
            loc: loc.label.toLowerCase(),
            comName: filters.companyName.toLowerCase(),
            minBasePay: parseInt(filters.minBasePay.label.split("K")[0]),
            minExp: parseInt(filters.minExp.label),
          });
        });
      } else {
        queryCombs.push({
          role: role.label.toLowerCase(),
          loc: "",
          comName: filters.companyName.toLowerCase(),
          minBasePay: parseInt(filters.minBasePay.label.split("K")[0]),
          minExp: parseInt(filters.minExp.label),
        });
      }
    });
  } else if (filters.location.length > 0) {
    filters.location.forEach((loc) => {
      if (filters.roles.length > 0) {
        filters.roles.forEach((role) => {
          queryCombs.push({
            role: role.label.toLowerCase(),
            loc: loc.label.toLowerCase(),
            comName: filters.companyName.toLowerCase(),
            minBasePay: parseInt(filters.minBasePay.label.split("K")[0]),
            minExp: parseInt(filters.minExp.label),
          });
        });
      } else {
        queryCombs.push({
          role: "",
          loc: loc.label.toLowerCase(),
          comName: filters.companyName.toLowerCase(),
          minBasePay: parseInt(filters.minBasePay.label.split("K")[0]),
          minExp: parseInt(filters.minExp.label),
        });
      }
    });
  } else {
    queryCombs.push({
      comName: filters.companyName.toLowerCase(),
      loc: "",
      role: "",
      minBasePay: parseInt(filters.minBasePay.label.split("K")[0]),
      minExp: parseInt(filters.minExp.label),
    });
  }

  queryCombs.forEach((query) => {
    jobs.forEach((job) => {
      if (
        job.companyName.toLowerCase().indexOf(query.comName) > -1 &&
        job.jobRole.indexOf(query.role) > -1 &&
        job.location.indexOf(query.loc) > -1 &&
        job.minExp >= (isNaN(query.minExp) ? 0 : query.minExp) &&
        job.minJdSalary >= (isNaN(query.minBasePay) ? 0 : query.minBasePay)
      ) {
        if (res[job.jdUid] === undefined) {
          res[job.jdUid] = job;
        }
      }
    });
  });

  return Object.values(res);
}

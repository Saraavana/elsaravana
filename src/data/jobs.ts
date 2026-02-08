import { loadJsonFile } from "./load-json";

type RecoveredJob = {
  strapiId?: number;
  company: string;
  position: string;
  date: string;
  description?: Array<{ id?: number; name: string }>;
};

export type Job = {
  id: number;
  company: string;
  position: string;
  date: string;
  descriptions: string[];
};

const recoveredJobs = loadJsonFile<RecoveredJob[]>(new URL("../../recovered_jobs.json", import.meta.url));

export const jobs: Job[] = recoveredJobs.map((job, index) => ({
  id: job.strapiId ?? index + 1,
  company: job.company,
  position: job.position,
  date: job.date,
  descriptions: (job.description ?? []).map((item) => item.name.trim()).filter(Boolean),
}));

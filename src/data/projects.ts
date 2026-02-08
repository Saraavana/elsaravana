import { loadJsonFile } from "./load-json";
import projectImageOne from "../assets/projects-1.jpg";
import projectImageTwo from "../assets/projects-2.jpg";
import projectImageThree from "../assets/projects-3.jpg";
import projectImageFour from "../assets/projects-4.jpg";
import { resolveRecoveredImage, type RecoveredFluidImage, type ResolvedImage } from "./image-path";

type RecoveredProject = {
  id: string;
  title: string;
  description: string;
  github: string | null;
  url: string | null;
  stack?: Array<{ id?: number; title: string }>;
  image?: RecoveredFluidImage;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  github?: string;
  url?: string;
  featured: boolean;
  stack: string[];
  image: ResolvedImage;
};

const recoveredProjects = loadJsonFile<RecoveredProject[]>(new URL("../../recovered_projects.json", import.meta.url));
const fallbackProjectImages = [projectImageOne.src, projectImageTwo.src, projectImageThree.src, projectImageFour.src];

export const projects: Project[] = recoveredProjects.map((project, index) => ({
  id: project.id,
  title: project.title.trim(),
  description: project.description.replace(/\s+/g, " ").trim(),
  github: project.github ?? undefined,
  url: project.url ?? undefined,
  featured: index < 3,
  stack: (project.stack ?? [])
    .map((item) => item.title.trim())
    .filter(Boolean),
  image: resolveRecoveredImage(project.image, fallbackProjectImages[index % fallbackProjectImages.length]),
}));

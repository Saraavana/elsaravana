import { loadJsonFile } from "./load-json";
import heroImage from "../assets/hero-img.png";
import { resolveRecoveredImage, type RecoveredFluidImage, type ResolvedImage } from "./image-path";

type RecoveredAbout = {
  title: string;
  info: string;
  stack?: Array<{ id?: number; title: string }>;
  image?: RecoveredFluidImage;
};

export type AboutContent = {
  title: string;
  info: string;
  stack: string[];
  image: ResolvedImage;
};

const recoveredAbout = loadJsonFile<RecoveredAbout>(new URL("../../recovered_about.json", import.meta.url));

export const aboutContent: AboutContent = {
  title: recoveredAbout.title,
  info: recoveredAbout.info.trim(),
  stack: (recoveredAbout.stack ?? [])
    .map((item) => item.title.trim())
    .filter(Boolean),
  image: resolveRecoveredImage(recoveredAbout.image, heroImage.src),
};

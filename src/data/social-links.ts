export type SocialLink = {
  id: number;
  icon: "linkedin" | "twitter" | "github" | "medium";
  url: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    icon: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/saravanakumar-gopalakrishnan-4717929b/",
  },
  {
    id: 2,
    icon: "twitter",
    label: "Twitter",
    url: "https://twitter.com/elsaravana",
  },
  {
    id: 3,
    icon: "github",
    label: "GitHub",
    url: "https://github.com/Saraavana",
  },
  {
    id: 4,
    icon: "medium",
    label: "Medium",
    url: "https://medium.com/@elsaravana",
  },
];

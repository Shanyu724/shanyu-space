import { getProjects } from "@/lib/content";
import { PortfolioClient } from "./PortfolioClient";

export default function PortfolioPage() {
  const projects = getProjects();
  return <PortfolioClient projects={projects} />;
}

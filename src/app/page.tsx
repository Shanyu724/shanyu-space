import { getMe } from "@/lib/me";
import { HomeClient } from "./HomeClient";

export default function HomePage() {
  const me = getMe();
  return <HomeClient me={me} />;
}

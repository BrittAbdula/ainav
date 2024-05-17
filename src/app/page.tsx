
import { fetchLinks } from "@/lib/data";
import { auth } from "@/auth";
import Links from "@/components/component/links";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  const links = await fetchLinks(userId);
  return (
    <>
      <Links links={links} defaultTab="all"/>
    </>
  );
}

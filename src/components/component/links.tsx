import { fetchLinks } from "@/lib/data";
import LinkCard from "./link-card";

export default async function Links() {
    const links = await fetchLinks();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 pt-4 md:gap-8 md:pt-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {links.map((link, index) => (
                        <LinkCard key={index} link={link} />
                    ))
                }
                </div>
            </main>
        </div>
    )
}
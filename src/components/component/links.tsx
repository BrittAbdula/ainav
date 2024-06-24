'use client'
import LinkCard from "./link-card";
import { LinkCardProps } from "./link-card";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SearchIcon, AppCenterIcon, FavoriteIcon } from "@/components/ui/svg";

export default function Links({ links, defaultTab }: { links: LinkCardProps[], defaultTab: string }) {
    const [tab, setTab] = useState(defaultTab);
    const [linksList, setLinksList] = useState<LinkCardProps[]>(links);

    useEffect(() => {
        fetch('/api/fetchLinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  filter: tab === "favorite" })
        }).then(response => response.json()).then(data => {
            setLinksList(data);
        })
            .catch(error => {
                console.log("An error occurred while fetching links");
            });
    }, [tab]);

    return (
        <>
            <Tabs defaultValue="week" className="items-center mt-4">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">
                            <AppCenterIcon className="h-4 w-4 text-muted-foreground" onClick={() => setTab("all")} />
                        </TabsTrigger>
                        <TabsTrigger value="favorite">
                            <FavoriteIcon className="h-4 w-4 text-muted-foreground" color="grey" onClick={() => setTab("favorite")} />
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <form className="ml-auto flex-1 sm:flex-initial">
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                    placeholder="Search AI websites..."
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Tabs>

            <div className="flex min-h-screen w-full flex-col">
                <main className="flex flex-1 flex-col gap-4 pt-4 md:gap-8 md:pt-4">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        {linksList.map((link, index) => (
                            <LinkCard key={index} link={link} />
                        ))
                        }
                    </div>
                </main>
            </div>
        </>
    )
}
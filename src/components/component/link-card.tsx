'use client'
import React from 'react';
import { useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card, CardDescription, CardFooter } from "@/components/ui/card";
import { LinkIcon, FavoriteIcon } from "@/components/ui/svg";

export type LinkCardProps = {
    task: {
        task: string;
        taskSlug: string | null;
    } | null;
    id: number;
    title: string;
    url: string;
    imageUrl: string | null;
    describe: string | null;
    favorites: { linkId: number; active: boolean; }[] | null;
}

export default function LinkCard({ link }: { link: LinkCardProps }) {
    const [favStatus, setFavStatus] = useState((link.favorites?.length || 0) > 0 ? true : false);

    const handleFav = async () => {
        fetch('/api/handleFav', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favId: link.id, favStatus: !favStatus })
        }).then(response => response.json())
            .then(favorite => {
                if (favorite) {
                    setFavStatus(favorite.active);
                }
                console.log("Favorite updated successfully: ", favorite);
            })
            .catch(error => {
                console.log("An error occurred while handling favorite");
            });

    }

    return (
        <Card className='shadow-md hover:bg-green-50'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-2xl font-bold">
                    <a href={link.url} rel="nofollow" className='hover:text-blue-500'>{link.title}</a>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="  text-muted-foreground  line-clamp-2">{link.task?.task}</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center justify-center gap-8 space-y-0 mt-2">
                    <a href={link.url} rel="nofollow">
                        <div className="p-2 border-2 border-transparent hover:border-gray-300 ">
                            <LinkIcon className="h-4 w-4 text-muted-foreground hover:text-blue-500" />
                        </div>
                    </a>
                    <div className="border-2 border-transparent hover:border-gray-300" onClick={handleFav} >
                        <FavoriteIcon className="h-4 w-4 text-muted-foreground hover:text-red-500" color={favStatus ? "red" : "none"} />
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
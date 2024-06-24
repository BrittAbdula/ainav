'use client'
import React, { useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { LinkIcon, FavoriteIcon } from "@/components/ui/svg";
import { signIn } from "next-auth/react"; // Assuming you're using next-auth for authentication
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
    userFavorite: { linkId: number; active: boolean; }[] | null;
}

export default function LinkCard({ link }: { link: LinkCardProps }) {
    const [favStatus, setFavStatus] = useState((link.userFavorite?.length || 0) > 0 ? true : false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const handleFav = async () => {
        fetch('/api/handleFav', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favId: link.id, favStatus: !favStatus })
        }).then(response => {
            if (response.status === 401) {
                setShowLoginDialog(true);
                return null;
            }
            return response.json();
        })
        .then(favorite => {
            if (favorite) {
                setFavStatus(favorite.active);
                console.log("Favorite updated successfully: ", favorite);
            }
        })
        .catch(error => {
            console.log("An error occurred while handling favorite");
        });
    }

    return (
        <Card className='shadow-md hover:bg-green-50'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex gap-2 text-2xl font-bold">
                    <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link.url}&size=128`} alt={link.title} className="h-8 w-8 rounded-full" />
                    <a href={link.url} rel="nofollow" className='hover:text-blue-500'>{link.title}</a>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground line-clamp-2">{link.task?.task}</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center justify-center gap-8 space-y-0 mt-2">
                    <a href={link.url} rel="nofollow">
                        <div className="p-2 border-2 border-transparent hover:border-gray-300">
                            <LinkIcon className="h-4 w-4 text-muted-foreground hover:text-blue-500" />
                        </div>
                    </a>
                    <div className="border-2 border-transparent hover:border-gray-300" onClick={handleFav}>
                        <FavoriteIcon className="h-4 w-4 text-muted-foreground hover:text-red-500" color={favStatus ? "red" : "none"} />
                    </div>
                </div>
            </CardFooter>
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Login Required</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" className="w-full" onClick={() => signIn()}>Sign In</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

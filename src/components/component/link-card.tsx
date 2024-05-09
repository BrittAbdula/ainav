import React from 'react';
import Link from 'next/link';
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"

export default function LinkCard({ link }: { link: { title: string, url: string, describe?: string|null, imageUrl?: string|null }}) {
    return (
        <Card className='shadow-md hover:bg-green-50'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold"><Link href={link.url} >{link.title}</Link></CardTitle>
            </CardHeader>
            <CardContent>
                <p className="  text-muted-foreground  line-clamp-2">{link.describe}</p>
                <div className="flex flex-row items-center justify-center gap-4 space-y-0 pt-4">
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>
    )
}


function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

// fetch Links
export const fetchLinks = async () => {
    try {
        const links = await prisma.link.findMany({
            select: {
                id: true,
                url: true,
                title: true,
                describe: true,
                imageUrl: true,
                task: {
                    select: {
                        task: true,
                        taskSlug: true,
                    }
                },
            },
            orderBy: { id: 'desc' },
            take: 100,
        });
        return links;
    } catch (error) {
        throw new Error("Failed to fetch links");
    }
} 

// fetch Link detail
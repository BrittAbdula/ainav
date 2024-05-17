import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

// fetch Links
export const fetchLinks = async (userId?: string, filter?: boolean, offset?: number, limit?: number) => {
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
                ...(userId &&
                    {
                        favorites: {
                            select: {
                                linkId: true,
                                active: true,
                            },
                            where: {
                                active: true,
                            },
                        },
                    }
                ),
            },
            ...(filter && {
                where: {
                    favorites: {
                        some: {
                            userId,
                            active: true,
                        }
                    }
                }
            }),
            orderBy: { id: 'desc' },
            take: limit || 10,
        });
        return links;
    } catch (error) {
        throw new Error("Failed to fetch links");
    }
}

// fetch Link detail

// handle favorite
export const handleFavorite = async (userId: string, favId: number, favStatus: boolean) => {
    const updatedAt = new Date();
    try {
        const favorite = await prisma.userFavorite.upsert({
            where: {
                userId_linkId: {
                    userId,
                    linkId: favId,
                },
            },
            update: {
                active: favStatus,
                updatedAt,
            },
            create: {
                userId,
                linkId: favId,
                active: true,
                updatedAt,
            },
            select: {
                active: true,
                linkId: true,
            },
        });
        return favorite;
    } catch (error) {
        throw new Error("Failed to handle favorite");
    }
}
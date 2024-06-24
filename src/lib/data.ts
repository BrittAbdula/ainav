import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

// fetch Links
export const fetchLinks = async (userId?: string, filter?: boolean, offset?: number, limit?: number) => {
    try {
        console.log("-----------fileter:", filter, "offset:", offset, "limit:", limit, "userId:", userId)
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
                        userFavorite: {
                            select: {
                                linkId: true,
                                active: true,
                            }
                        },
                    }
                ),
            },
            ...(filter && {
                where: {
                    userFavorite: {
                        some: {
                            userId
                        }
                    }
                }
            }),
            orderBy: { id: 'desc' },
            take: limit || 100,
        });
        return links;
    } catch (error) {
        console.log("-----Error fetching links:", error);
        throw new Error("Failed to fetch links");
    }
}

// fetch LinkDetail by LinkId
export const fetchLinkDetail = async (linkId: number) => {
    try {
        const link = await prisma.link.findUnique({
            where: {
                id: linkId,
            },
            select: {
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
                userFavorite: {
                    select: {
                        userId: true,
                        active: true,
                    },
                },
                linkDetail: {
                    select: {
                        content: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return link;
    } catch (error) {
        console.error("Error fetching link detail:", error);
        throw new Error("Failed to fetch link detail");
    }
}


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
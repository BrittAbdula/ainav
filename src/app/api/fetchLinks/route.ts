import { fetchLinks } from "@/lib/data";
import { auth } from "@/auth";

export const POST = async function POST(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;
    const { offset, limit, filter } = await request.json();
    const links = await fetchLinks(userId, filter, offset, limit);
    return Response.json(links);
} 
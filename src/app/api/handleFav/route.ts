import { auth } from "@/auth"
import { handleFavorite } from "@/lib/data";

export const POST = auth(async function POST(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return Response.redirect('/api/auth/signin')
    }

    const { favId, favStatus } = await request.json();
    console.log(favId, favStatus)
    const favorite = await handleFavorite(userId, favId, favStatus);
    console.log(favorite)
    return Response.json(favorite)
})
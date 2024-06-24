// pages/api/handleFav.js
import { auth } from "@/auth";
import { handleFavorite } from "@/lib/data";

export const POST = auth(async function POST(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return new Response(null, { status: 401 });  // Return 401 Unauthorized status
    }

    const { favId, favStatus } = await request.json();
    console.log(favId, favStatus);
    const favorite = await handleFavorite(userId, favId, favStatus);
    console.log(favorite);
    return new Response(JSON.stringify(favorite), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
});

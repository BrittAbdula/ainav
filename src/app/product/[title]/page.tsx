import { fetchLinkDetail } from "@/lib/data";

export default async function ProductPage({ linkId }: { linkId: number }) {
    const link = await fetchLinkDetail(linkId);

    return (
        <div>
            <h1>{link?.title}</h1>
            <p>{link?.describe}</p>
            <p>{link?.linkDetail?.content}</p>
        </div>
    )
}
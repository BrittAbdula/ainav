import { fetchLinkDetail } from "@/lib/data";

export default async function ProductPage({ params }: {params: { linkId: number }}) {
    const link = await fetchLinkDetail(Number(params.linkId));

    return (
        <div>
            <h1>{link?.title}</h1>
            <p>{link?.describe}</p>
            <p>{link?.linkDetail?.content}</p>
        </div>
    )
}
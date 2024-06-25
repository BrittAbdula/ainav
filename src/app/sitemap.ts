import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            "url": "https://aiwebsiteslist.com/",
            "lastModified": new Date().toISOString(),
            "changeFrequency": "weekly",
            "priority": 0.7
        }
    ];
}
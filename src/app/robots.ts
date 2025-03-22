import { baseURL } from "@/app/resources";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isNoindex = process.env.APP_INDEX_MODE === "NOINDEX";
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN;

  return {
    rules: isNoindex
      ? {
          userAgent: "*",
          disallow: "/",
        }
      : {
          userAgent: "*",
          allow: "/",
        },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

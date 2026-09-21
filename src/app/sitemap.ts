import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aquanubandh.com";

  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "https://plcounter.aquanubandh.com",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }, 
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  try {
    // Dynamic blog posts
    const posts = await client.fetch<any[]>(
      `*[_type == "post" && defined(slug.current) && seo.noIndex != true] {
        "slug": slug.current,
        _updatedAt
      }`
    );

    const postUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Dynamic products
    const products = await client.fetch<any[]>(
      `*[_type == "product" && defined(slug.current) && seo.noIndex != true] {
        "slug": slug.current,
        _updatedAt
      }`
    );

    const productUrls = products.map((prod) => ({
      url: `${baseUrl}/shop/${prod.slug}`,
      lastModified: new Date(prod._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...routes, ...postUrls, ...productUrls];
  } catch (error) {
    console.error("Dynamic sitemap generation failed:", error);
    return routes;
  }
}

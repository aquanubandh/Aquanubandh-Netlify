import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import NewsletterForm from "../components/NewsletterForm";

export const metadata: Metadata = {
  title: "Aquanubandh | Shrimp Farming Blog & Resources",
  description: "Expert insights on shrimp pond management, Vannamei FCR calculation, biomass monitoring, and aquaculture best practices.",
  alternates: {
    canonical: "https://aquanubandh.com/blog",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await client.fetch<any[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      excerpt
    }`
  );

  return (
    <main>
      <header className="blog-hero">
        <div className="container">
          <h1 className="blog-hero-h1">Aquanubandh Blog</h1>
          <p className="blog-hero-sub">
            Insights, tutorials, and practical advice to help you optimize FCR, boost survival rates, and maximize Vannamei biomass outcomes.
          </p>
        </div>
      </header>

      <section className="blog-body-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="notice-card" style={{ margin: "0 auto" }}>
              <div className="notice-icon-box">
                <BookOpen style={{ width: 32, height: 32 }} />
              </div>
              <h2 className="notice-card-h2">The Aquanubandh Blog is Coming Soon</h2>
              <p className="notice-card-p">
                We are preparing rich articles on feed schedules, soil/water chemistry, disease prevention, and regional price monitoring. Subscribe below to be notified when the first articles are live.
              </p>
              
              <NewsletterForm />
              <div className="signup-note" style={{ marginTop: 12 }}>No spam. Only premium aquaculture guides.</div>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => {
                const imageUrl = post.mainImage ? urlFor(post.mainImage).width(400).height(250).url() : null;
                const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                  return (
                    <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
                      <article className="blog-card" style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
                        {imageUrl && (
                          <div className="blog-img-wrap">
                            <img 
                              src={imageUrl} 
                              alt={post.title} 
                              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                            />
                          </div>
                        )}
                        <div className="blog-card-body">
                          <div className="blog-card-date">{formattedDate}</div>
                          <h2 className="blog-card-title">{post.title}</h2>
                          {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                          <div className="blog-card-link">
                            Read Article <ArrowRight style={{ width: 14, height: 14 }} />
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

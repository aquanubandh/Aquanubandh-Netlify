import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await client.fetch<any[]>(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  );
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await client.fetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      mainImage,
      seo
    }`,
    { slug: params.slug }
  );

  if (!post) {
    return {};
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt || "";
  const canonical = `https://aquanubandh.com/blog/${params.slug}`;

  const metadata: Metadata = {
    title: `${title} | Aquanubandh Blog`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (post.seo?.image || post.mainImage) {
    const imgUrl = urlFor(post.seo?.image || post.mainImage).width(1200).height(630).url();
    metadata.openGraph!.images = [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
    metadata.twitter!.images = [imgUrl];
  }

  if (post.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function BlogPostPage({ params }: Props) {
  const post = await client.fetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      publishedAt,
      mainImage,
      body
    }`,
    { slug: params.slug }
  );

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const heroImageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(450).url() : null;

  return (
    <main className="article-section">
      <article className="article-container">
        <header className="article-header">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span>By Aquanubandh Team</span>
          </div>
        </header>

        {heroImageUrl && (
          <div className="article-hero-image">
            <img 
              src={heroImageUrl} 
              alt={post.title} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
        )}

        <div className="article-content">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>
    </main>
  );
}

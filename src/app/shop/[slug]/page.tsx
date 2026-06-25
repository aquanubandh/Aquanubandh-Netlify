import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Truck, FileText } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await client.fetch<any[]>(
    `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`
  );
  return products.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await client.fetch<any>(
    `*[_type == "product" && slug.current == $slug][0] {
      name,
      description,
      images,
      seo
    }`,
    { slug: params.slug }
  );

  if (!product) {
    return {};
  }

  const title = product.seo?.title || product.name;
  const description = product.seo?.description || product.description || "";
  const canonical = `https://aquanubandh.com/shop/${params.slug}`;

  const metadata: Metadata = {
    title: `${title} | Aquanubandh Store`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (product.seo?.image || (product.images && product.images[0])) {
    const imgUrl = urlFor(product.seo?.image || product.images[0]).width(1200).height(630).url();
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

  if (product.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

// Helper to convert Sanity file asset reference to download URL
function getFileUrl(ref: string) {
  if (!ref) return "#";
  const parts = ref.split("-");
  if (parts.length < 3) return "#";
  const id = parts[1];
  const extension = parts[2];
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uvfn7wo6";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await client.fetch<any>(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      brand,
      category,
      images,
      price,
      description,
      features,
      specifications,
      pdfDownloads,
      externalPurchaseLink,
      featuredProduct
    }`,
    { slug: params.slug }
  );

  if (!product) {
    notFound();
  }

  const mainImageUrl = product.images && product.images[0]
    ? urlFor(product.images[0]).width(800).url()
    : null;

  // Dynamic WhatsApp pre-filled text
  const waPurchaseLink = product.externalPurchaseLink || 
    `https://wa.link/ecqo7w?text=${encodeURIComponent(`Hi, I'm interested in ordering ${product.name} from Aquanubandh Store.`)}`;

  const canonical = `https://aquanubandh.com/shop/${params.slug}`;

  // JSON-LD structured data for Google Product Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": mainImageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Aquanubandh"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price ? product.price.replace(/[^0-9.]/g, "") : "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": canonical
    }
  };

  return (
    <main className="detail-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <ChevronRight style={{ width: 14, height: 14 }} />
          <Link href="/shop">Shop</Link>
          <ChevronRight style={{ width: 14, height: 14 }} />
          <span style={{ color: "var(--ink)" }}>{product.name}</span>
        </div>

        {/* Grid Layout */}
        <div className="detail-grid">
          {/* Gallery */}
          <div className="gallery-container" style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
            {mainImageUrl ? (
              <img src={mainImageUrl} alt={product.name} id="main-product-img" />
            ) : (
              <div style={{ color: "#cbd5e1" }}>No Image Available</div>
            )}
            {product.featuredProduct && <span className="badge-float">Featured</span>}
          </div>

          {/* Product Details */}
          <div className="info-container">
            {product.brand && <span className="brand-meta">{product.brand}</span>}
            <h1 className="product-title-h1">{product.name}</h1>
            


            <div className="divider"></div>

            <div className="price-card">
              <div className="price-row">
                <span className="price-large">
                  {product.price ? (
                    product.price.includes("/") ? (
                      <>
                        {product.price.split("/")[0]}
                        <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                          /{product.price.split("/")[1]}
                        </span>
                      </>
                    ) : (
                      product.price
                    )
                  ) : (
                    "Contact Us"
                  )}
                </span>
              </div>
              
              <div className="delivery-guarantee">
                <Truck style={{ width: 16, height: 16 }} />
                <span>Delivery across India</span>
              </div>
            </div>

            {product.description && <p className="desc-text">{product.description}</p>}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ul className="prod-features-list">
                {product.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}

            {/* Buy Button */}
            <div className="buy-action-box">
              <a href={waPurchaseLink} className="btn-buy-wa" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginTop: 2 }}>
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.37 5.084L2 22l5.085-1.334A9.963 9.963 0 0 0 12.01 22c5.507 0 9.991-4.479 9.992-9.986.002-2.668-1.033-5.176-2.922-7.067C17.191 3.056 14.682 2.001 12.012 2zm5.72 14.156c-.237.669-1.378 1.282-1.91 1.341-.49.053-.974.256-3.136-.634-2.766-1.137-4.545-3.957-4.683-4.143-.139-.184-1.123-1.493-1.123-2.85 0-1.355.706-2.02.96-2.28.253-.26.556-.324.742-.324h.532c.164 0 .385-.062.6.45.22.526.754 1.836.819 1.968.064.133.109.288.02.463-.09.176-.134.288-.266.442-.132.155-.278.347-.397.464-.131.13-.27.27-.116.536.155.267.689 1.137 1.477 1.838.995.897 1.848 1.173 2.113 1.306.265.132.421.11.579-.07.157-.184.67-.78.851-1.047.18-.266.362-.224.608-.133.247.092 1.564.738 1.833.873.27.135.45.203.514.31.065.11.065.632-.172 1.302z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="specs-container">
                <h2 className="specs-h2">Specifications</h2>
                <table className="specs-table">
                  <tbody>
                    {product.specifications.map((spec: any, idx: number) => (
                      <tr key={idx}>
                        <td className="specs-lbl">{spec.key}</td>
                        <td className="specs-val">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* File Downloads */}
            {product.pdfDownloads && product.pdfDownloads.length > 0 && (
              <div className="pdf-download-box">
                {product.pdfDownloads.map((pdf: any, idx: number) => (
                  <a
                    key={idx}
                    href={getFileUrl(pdf.asset?._ref)}
                    className="pdf-download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText style={{ width: 16, height: 16 }} />
                    {pdf.title || "Download PDF Brochure"}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

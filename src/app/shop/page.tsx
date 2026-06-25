import { client } from "@/sanity/client";
import ShopClient from "./ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquanubandh | Shrimp Feed, Medicine & Mineral Store",
  description: "Direct-to-farm shrimp inputs. Order premium Avanti feed, medicines, and minerals at a flat rate of ₹85 per kg via WhatsApp. Quality tested, antibiotic-free.",
  alternates: {
    canonical: "https://aquanubandh.com/shop",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ShopPage() {
  const products = await client.fetch<any[]>(
    `*[_type == "product" && defined(slug.current)] | order(featuredProduct desc, name asc) {
      _id,
      name,
      "slug": slug.current,
      brand,
      category,
      images,
      price,
      featuredProduct,
      specifications
    }`
  );

  return (
    <main>
      {/* Shop Hero */}
      <header className="shop-hero">
        <div className="container">
          <h1 className="shop-hero-h1">Direct-to-Farm Inputs</h1>
          <p className="shop-hero-sub">
            Get premium feeds, medicines, and minerals delivered directly to your pond gate. Low price guarantee, antibiotic-free.
          </p>
        </div>
      </header>

      {/* Catalogue section */}
      <section className="shop-section">
        <div className="container">
          <ShopClient initialProducts={products} />
        </div>
      </section>
    </main>
  );
}

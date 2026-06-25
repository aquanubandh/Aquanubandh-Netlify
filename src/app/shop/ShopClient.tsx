"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/image";

type Product = {
  _id: string;
  name: string;
  slug: string;
  brand?: string;
  category: string;
  images?: any[];
  price?: string;
  featuredProduct?: boolean;
  specifications?: Array<{ key: string; value: string }>;
};

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { title: "All Products", value: "all" },
    { title: "Feeds", value: "feeds" },
    { title: "Medicines", value: "medicines" },
    { title: "Minerals", value: "minerals" },
  ];

  const filteredProducts = initialProducts.filter((product) => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  });

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="shop-filter-container">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`shop-filter-btn ${activeCategory === cat.value ? "active" : ""}`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div className="shop-grid">
        {filteredProducts.map((prod) => {
          const imageUrl = prod.images && prod.images[0] ? urlFor(prod.images[0]).width(300).height(280).url() : null;
          
          return (
            <Link key={prod._id} href={`/shop/${prod.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
              <div className="prod-card" style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
                <div className="prod-img-wrap">
                  {imageUrl ? (
                    <img src={imageUrl} alt={prod.name} />
                  ) : (
                    <div style={{ color: "#cbd5e1" }}>No Image</div>
                  )}
                  {prod.featuredProduct && <span className="prod-badge">Featured</span>}
                </div>
                
                <div className="prod-body">
                  <h3 className="prod-title">{prod.name}</h3>
                  <div className="prod-type">{prod.category}</div>
                  
                  <div className="prod-meta">
                    {prod.brand && (
                      <div className="prod-meta-row">
                        <span className="prod-meta-lbl">Brand</span>
                        <span className="prod-meta-val">{prod.brand}</span>
                      </div>
                    )}
                    {prod.specifications?.slice(0, 2).map((spec, index) => (
                      <div key={index} className="prod-meta-row">
                        <span className="prod-meta-lbl">{spec.key}</span>
                        <span className="prod-meta-val">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="prod-footer">
                  <div className="prod-price-box">
                    <span className="prod-price-lbl">Price</span>
                    {prod.price ? (
                      <span className="prod-price-val">
                        {prod.price.includes("/") ? (
                          <>
                            {prod.price.split("/")[0]}
                            <span>/{prod.price.split("/")[1]}</span>
                          </>
                        ) : (
                          prod.price
                        )}
                      </span>
                    ) : (
                      <span className="prod-price-val">Contact</span>
                    )}
                  </div>
                  <div className="prod-order-btn">
                    View Details
                    <ArrowRight style={{ width: 15, height: 15 }} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>
          No products found in this category.
        </div>
      )}
    </>
  );
}

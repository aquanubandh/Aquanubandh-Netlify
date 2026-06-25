import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Aquanubandh - Get Support & Answers",
  description: "Have questions about our Vannamei shrimp farm app or ordering feeds? Contact the Aquanubandh team via WhatsApp or email.",
  alternates: {
    canonical: "https://aquanubandh.com/contact",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
  const settings = await client.fetch<any>(
    `*[_id == "settings"][0] {
      email,
      whatsappUrl,
      phone,
      address
    }`
  );

  const email = settings?.email || "aquanubandh@gmail.com";
  const whatsappUrl = settings?.whatsappUrl || "https://wa.link/ecqo7w";
  const phone = settings?.phone;
  const address = settings?.address;

  return (
    <main>
      <header className="blog-hero" style={{ padding: "130px 32px 64px" }}>
        <div className="container">
          <h1 className="blog-hero-h1">Contact Us</h1>
          <p className="blog-hero-sub">
            We are here to support Indian shrimp farmers. Get in touch with us for help with FCR tracking, feed logging, or inputs ordering.
          </p>
        </div>
      </header>

      <section className="blog-body-section" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <div className="notice-card" style={{ margin: "0 auto", textAlign: "left", padding: "40px" }}>
            <h2 className="notice-card-h2" style={{ marginBottom: "20px", fontSize: "28px" }}>Get in Touch</h2>
            <p className="notice-card-p" style={{ textAlign: "left", marginBottom: "32px" }}>
              Have queries about Vannamei stocking, feed FCR calculation, or want to order feed? Contact our team directly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* WhatsApp Option */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dl-option" 
                style={{ 
                  background: "rgba(22, 163, 74, 0.08)", 
                  borderColor: "rgba(22, 163, 74, 0.15)",
                  color: "var(--ink)",
                  padding: "20px"
                }}
              >
                <div className="dl-option-icon" style={{ background: "#16a34a" }}>
                  <MessageCircle style={{ width: 22, height: 22, color: "white" }} />
                </div>
                <div className="dl-option-text">
                  <div className="dl-option-sub" style={{ color: "#16a34a" }}>Chat with Support</div>
                  <div className="dl-option-name" style={{ color: "var(--ink)" }}>WhatsApp Us</div>
                </div>
                <div className="dl-option-arrow" style={{ color: "#16a34a" }}>
                  <Send style={{ width: 18, height: 18 }} />
                </div>
              </a>

              {/* Email Option */}
              <a 
                href={`mailto:${email}`}
                className="dl-option" 
                style={{ 
                  background: "rgba(37, 99, 235, 0.08)", 
                  borderColor: "rgba(37, 99, 235, 0.15)",
                  color: "var(--ink)",
                  padding: "20px"
                }}
              >
                <div className="dl-option-icon" style={{ background: "var(--blue)" }}>
                  <Mail style={{ width: 22, height: 22, color: "white" }} />
                </div>
                <div className="dl-option-text">
                  <div className="dl-option-sub" style={{ color: "var(--blue)" }}>Email Enquiries</div>
                  <div className="dl-option-name" style={{ color: "var(--ink)", wordBreak: "break-all" }}>{email}</div>
                </div>
                <div className="dl-option-arrow" style={{ color: "var(--blue)" }}>
                  <Send style={{ width: 18, height: 18 }} />
                </div>
              </a>

              {/* Phone (Optional) */}
              {phone && (
                <div 
                  className="dl-option" 
                  style={{ 
                    background: "rgba(15, 23, 42, 0.04)", 
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                    padding: "20px",
                    cursor: "default"
                  }}
                >
                  <div className="dl-option-icon" style={{ background: "var(--ink-muted)" }}>
                    <Phone style={{ width: 22, height: 22, color: "white" }} />
                  </div>
                  <div className="dl-option-text">
                    <div className="dl-option-sub" style={{ color: "var(--ink-muted)" }}>Call Center Support</div>
                    <div className="dl-option-name" style={{ color: "var(--ink)" }}>{phone}</div>
                  </div>
                </div>
              )}

              {/* Address (Optional) */}
              {address && (
                <div 
                  className="dl-option" 
                  style={{ 
                    background: "rgba(15, 23, 42, 0.04)", 
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                    padding: "20px",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start"
                  }}
                >
                  <div className="dl-option-icon" style={{ background: "var(--ink-muted)", marginTop: "2px" }}>
                    <MapPin style={{ width: 22, height: 22, color: "white" }} />
                  </div>
                  <div className="dl-option-text" style={{ marginLeft: "16px" }}>
                    <div className="dl-option-sub" style={{ color: "var(--ink-muted)" }}>Headquarters Address</div>
                    <div style={{ color: "var(--ink)", fontSize: "15px", fontWeight: "600", marginTop: "4px", lineHeight: "1.5" }}>
                      {address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

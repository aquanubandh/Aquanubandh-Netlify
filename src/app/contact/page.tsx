import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <style>{`
        .contact-hero {
          padding: 130px 32px 64px;
        }
        .contact-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }
        .contact-card {
          margin: 0 auto;
          text-align: left;
          padding: 40px;
          background: #ffffff;
          border-radius: var(--radius-xl, 20px);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }
        .contact-dl-option {
          padding: 20px;
        }
        @media (max-width: 640px) {
          .contact-hero {
            padding: 100px 16px 44px !important;
          }
          .contact-container {
            padding: 0 12px !important;
          }
          .contact-card {
            padding: 24px 16px !important;
            border-radius: 16px !important;
          }
          .contact-card .notice-card-h2 {
            font-size: 24px !important;
            margin-bottom: 12px !important;
          }
          .contact-card .notice-card-p {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
          }
          .contact-dl-option {
            padding: 14px 14px !important;
            gap: 12px !important;
          }
          .contact-email-name {
            font-size: 14px !important;
            word-break: break-word !important;
          }
        }
      `}</style>

      <header className="blog-hero contact-hero">
        <div className="container">
          <h1 className="blog-hero-h1">Contact Us</h1>
        </div>
      </header>

      <section className="blog-body-section" style={{ background: "var(--bg)", padding: "40px 0 80px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="contact-container">
          <div className="notice-card contact-card">
            <h2 className="notice-card-h2" style={{ marginBottom: "32px", fontSize: "28px" }}>Get in Touch</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* WhatsApp Option */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dl-option contact-dl-option" 
                style={{ 
                  background: "rgba(22, 163, 74, 0.08)", 
                  borderColor: "rgba(22, 163, 74, 0.15)",
                  color: "var(--ink)"
                }}
              >
                <div className="dl-option-icon" style={{ background: "#16a34a" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
                className="dl-option contact-dl-option" 
                style={{ 
                  background: "rgba(37, 99, 235, 0.08)", 
                  borderColor: "rgba(37, 99, 235, 0.15)",
                  color: "var(--ink)"
                }}
              >
                <div className="dl-option-icon" style={{ background: "var(--blue)" }}>
                  <Mail style={{ width: 20, height: 20, color: "white" }} />
                </div>
                <div className="dl-option-text">
                  <div className="dl-option-sub" style={{ color: "var(--blue)" }}>Email Enquiries</div>
                  <div className="dl-option-name contact-email-name" style={{ color: "var(--ink)" }}>{email}</div>
                </div>
                <div className="dl-option-arrow" style={{ color: "var(--blue)" }}>
                  <Send style={{ width: 18, height: 18 }} />
                </div>
              </a>

              {/* Phone (Optional) */}
              {phone && (
                <div 
                  className="dl-option contact-dl-option" 
                  style={{ 
                    background: "rgba(15, 23, 42, 0.04)", 
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                    cursor: "default"
                  }}
                >
                  <div className="dl-option-icon" style={{ background: "var(--ink-muted)" }}>
                    <Phone style={{ width: 20, height: 20, color: "white" }} />
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
                  className="dl-option contact-dl-option" 
                  style={{ 
                    background: "rgba(15, 23, 42, 0.04)", 
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start"
                  }}
                >
                  <div className="dl-option-icon" style={{ background: "var(--ink-muted)", marginTop: "2px" }}>
                    <MapPin style={{ width: 20, height: 20, color: "white" }} />
                  </div>
                  <div className="dl-option-text" style={{ marginLeft: "14px" }}>
                    <div className="dl-option-sub" style={{ color: "var(--ink-muted)" }}>Headquarters Address</div>
                    <div style={{ color: "var(--ink)", fontSize: "14.5px", fontWeight: "600", marginTop: "4px", lineHeight: "1.5" }}>
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

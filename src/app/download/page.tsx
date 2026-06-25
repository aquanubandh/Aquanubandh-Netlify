import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Aquanubandh - India's #1 Shrimp Farm App",
  description: "Download the free Aquanubandh app for Vannamei shrimp pond tracking, FCR calculation, feed logging, and biomass estimation in India.",
  alternates: {
    canonical: "https://aquanubandh.com/download",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function DownloadPage() {
  const settings = await client.fetch<any>(
    `*[_id == "settings"][0] {
      iosUrl,
      androidUrl
    }`
  );

  const iosUrl = settings?.iosUrl || "https://dummyiosapp.com";
  const androidUrl = settings?.androidUrl || "https://dummyiosapp.com";

  return (
    <main style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "100px 16px 60px",
      background: "radial-gradient(ellipse 80% 60% at 50% 50%, #0d1e5c 0%, #08123b 100%)"
    }}>
      <div className="dl-modal" style={{ 
        transform: "none", 
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        boxShadow: "0 32px 80px rgba(0, 0, 0, 0.45)",
        margin: "0 auto",
        position: "relative"
      }}>
        <Link href="/" className="dl-modal-close" style={{ textDecoration: "none" }} aria-label="Close">
          <X style={{ width: 15, height: 15 }} />
        </Link>
        <div className="dl-modal-logo">
          <img src="/assets/logo.webp" alt="Aquanubandh - Smart Aquaculture Management Logo" />
          <span>Aquanubandh</span>
        </div>
        <h1 className="dl-modal-title">Download the app</h1>
        <p className="dl-modal-sub">Free for Indian shrimp farmers. Available on iOS and Android.</p>
        
        <div className="dl-modal-options">
          <a className="dl-option" href={iosUrl} target="_blank" rel="noopener noreferrer">
            <div className="dl-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.38.07 2.34.74 3.13.8 1.19-.24 2.33-.93 3.6-.84 1.54.12 2.69.72 3.44 1.83-3.14 1.9-2.38 5.96.46 7.19-.57 1.5-1.3 2.98-2.63 3.9zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </div>
            <div className="dl-option-text">
              <div className="dl-option-sub">Download on the</div>
              <div className="dl-option-name">App Store</div>
            </div>
            <div className="dl-option-arrow">
              <ArrowRight style={{ width: 16, height: 16 }} />
            </div>
          </a>
          
          <a className="dl-option" href={androidUrl} target="_blank" rel="noopener noreferrer">
            <div className="dl-option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M3.18 23.76c.28.16.6.16.88 0l10.96-6.32-2.4-2.4-9.44 8.72zm16.64-9.64l-2.56-1.48-2.68 2.68 2.68 2.68 2.6-1.5c.74-.44.74-1.96-.04-2.38zM3.06.24C2.78.4 2.6.7 2.6 1.06v21.88l9.44-9.44L3.06.24zm11 10.4L5.54.24 3.06.24l10.4 10.4H14.06z" />
              </svg>
            </div>
            <div className="dl-option-text">
              <div className="dl-option-sub">Get it on</div>
              <div className="dl-option-name">Google Play</div>
            </div>
            <div className="dl-option-arrow">
              <ArrowRight style={{ width: 16, height: 16 }} />
            </div>
          </a>
        </div>
        <div className="dl-modal-note">Free to download. No credit card required.</div>
      </div>
    </main>
  );
}

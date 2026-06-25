"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ArrowRight, Download, Home, Map, Layers, Tag, MessageCircle, Info, Mail, BookOpen } from "lucide-react";

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDlModalOpen, setIsDlModalOpen] = useState(false);

  const isDownloadPage = pathname === "/download";

  if (isDownloadPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Navigation */}
      <nav className="nav" id="main-nav">
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <img src="/assets/logo.webp" alt="Aquanubandh - Smart Aquaculture Management Logo" />
            <span className="nav-logo-name">Aquanubandh</span>
          </Link>
          <div className="nav-links">
            <a href="/#how">How it works</a>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <Link href="/shop" className="nav-shop-btn" aria-label="Shop">
              <ShoppingCart style={{ width: 18, height: 18 }} />
            </Link>
            <button className="nav-hamburger" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <img src="/assets/logo.webp" alt="Aquanubandh - Smart Aquaculture Management Logo" />
              <span className="footer-logo-name">Aquanubandh</span>
            </div>
            <div className="footer-meta">
              © 2026 Aquanubandh · Smart shrimp feeding app enabling Indian shrimp farmers advance the digital world.
            </div>
          </div>
          <div className="footer-links">
            <Link href="/contact">Contact Us</Link>
            <a href="#">Privacy Policy</a>
            <Link href="/contact">WhatsApp Support</Link>
          </div>
        </div>
      </footer>

      {/* Slide-out Menu Panel */}
      {isMenuOpen && (
        <>
          <div className="menu-overlay open" onClick={() => setIsMenuOpen(false)} />
          <div className="menu-panel open">
            <div className="menu-header">
              <div className="menu-logo">
                <img src="/assets/logo.webp" alt="Aquanubandh - Smart Aquaculture Management Logo" />
                <span>Aquanubandh</span>
              </div>
              <button className="menu-close" onClick={() => setIsMenuOpen(false)}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <div className="menu-body">
              <div className="menu-body-inner">
                <div className="menu-col">
                  <div className="menu-section-title">Pages</div>
                  <Link className="menu-item" href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Home style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Home</div>
                      <div className="menu-item-sub">Return to homepage</div>
                    </div>
                  </Link>
                  <a className="menu-item" href="/#how" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Map style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">How it works</div>
                      <div className="menu-item-sub">4-step walkthrough</div>
                    </div>
                  </a>
                  <a className="menu-item" href="/#features" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Layers style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Features</div>
                      <div className="menu-item-sub">FCR, biomass, team access</div>
                    </div>
                  </a>
                  <a className="menu-item" href="/#pricing" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Tag style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Pricing</div>
                      <div className="menu-item-sub">Free forever</div>
                    </div>
                  </a>
                  <a className="menu-item" href="/#faq" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><MessageCircle style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">FAQ</div>
                      <div className="menu-item-sub">Common questions answered</div>
                    </div>
                  </a>
                  <div className="menu-divider" />
                  <div className="menu-section-title">Company</div>
                  <a className="menu-item" href="/about" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Info style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">About</div>
                      <div className="menu-item-sub">Our mission & the team</div>
                    </div>
                  </a>
                  <Link className="menu-item" href="/shop" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><ShoppingCart style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Shop</div>
                      <div className="menu-item-sub">Feeds & inputs</div>
                    </div>
                  </Link>
                  <Link className="menu-item" href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Mail style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Contact Us</div>
                      <div className="menu-item-sub">Get support & order feeds</div>
                    </div>
                  </Link>
                </div>
                <div className="menu-col">
                  <div className="menu-section-title">Resources</div>
                  <Link className="menu-item" href="/blog" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><BookOpen style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Blog</div>
                      <div className="menu-item-sub">Farm tips, FCR guides, disease alerts</div>
                    </div>
                  </Link>
                  <a className="menu-item" href="#" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Layers style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Shrimp Price Tracker</div>
                      <div className="menu-item-sub">Daily vannamei rates by state</div>
                    </div>
                    <span className="menu-item-badge new">Soon</span>
                  </a>
                  <a className="menu-item" href="#" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Layers style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Disease Alerts</div>
                      <div className="menu-item-sub">EMS, WSSV & outbreak news</div>
                    </div>
                    <span className="menu-item-badge new">Soon</span>
                  </a>
                  <a className="menu-item" href="#" onClick={() => setIsMenuOpen(false)}>
                    <div className="menu-item-icon"><Layers style={{ width: 16, height: 16 }} /></div>
                    <div className="menu-item-text">
                      <div className="menu-item-label">Calculator</div>
                      <div className="menu-item-sub">Free standalone tool</div>
                    </div>
                    <span className="menu-item-badge new">Soon</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="menu-footer">
              <Link className="menu-footer-dl" href="/download" onClick={() => setIsMenuOpen(false)}>
                <Download style={{ width: 16, height: 16 }} />
                Download Aquanubandh, Free
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Download Modal */}
      {isDlModalOpen && (
        <div className="dl-modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setIsDlModalOpen(false); }}>
          <div className="dl-modal">
            <button className="dl-modal-close" onClick={() => setIsDlModalOpen(false)}>
              <X style={{ width: 15, height: 15 }} />
            </button>
            <div className="dl-modal-logo">
              <img src="/assets/logo.webp" alt="Aquanubandh - Smart Aquaculture Management Logo" />
              <span>Aquanubandh</span>
            </div>
            <div className="dl-modal-title">Download the app</div>
            <div className="dl-modal-sub">Free for Indian shrimp farmers. Available on iOS and Android.</div>
            <div className="dl-modal-options">
              <a className="dl-option" href="https://dummyiosapp.com" target="_blank" rel="noopener noreferrer">
                <div className="dl-option-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.38.07 2.34.74 3.13.8 1.19-.24 2.33-.93 3.6-.84 1.54.12 2.69.72 3.44 1.83-3.14 1.9-2.38 5.96.46 7.19-.57 1.5-1.3 2.98-2.63 3.9zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </div>
                <div className="dl-option-text">
                  <div className="dl-option-sub">Download on the</div>
                  <div className="dl-option-name">App Store</div>
                </div>
                <div className="dl-option-arrow"><ArrowRight style={{ width: 16, height: 16 }} /></div>
              </a>
              <a className="dl-option" href="https://dummyiosapp.com" target="_blank" rel="noopener noreferrer">
                <div className="dl-option-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M3.18 23.76c.28.16.6.16.88 0l10.96-6.32-2.4-2.4-9.44 8.72zm16.64-9.64l-2.56-1.48-2.68 2.68 2.68 2.68 2.6-1.5c.74-.44.74-1.96-.04-2.38zM3.06.24C2.78.4 2.6.7 2.6 1.06v21.88l9.44-9.44L3.06.24zm11 10.4L5.54.24 3.06.24l10.4 10.4H14.06z" />
                  </svg>
                </div>
                <div className="dl-option-text">
                  <div className="dl-option-sub">Get it on</div>
                  <div className="dl-option-name">Google Play</div>
                </div>
                <div className="dl-option-arrow"><ArrowRight style={{ width: 16, height: 16 }} /></div>
              </a>
            </div>
            <div className="dl-modal-note">Free to download. No credit card required.</div>
          </div>
        </div>
      )}
    </>
  );
}

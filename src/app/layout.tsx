import type { Metadata } from "next";
import "./globals.css";
import HeaderFooterWrapper from "./components/HeaderFooterWrapper";

export const metadata: Metadata = {
  title: "Aquanubandh Plus",
  description: "Smart Aquaculture Platform & Farm Software for Shrimp Farmers and Seafood Buyers in India",
  icons: {
    icon: "/assets/logo.webp",
    shortcut: "/assets/logo.webp",
    apple: "/assets/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
      </body>
    </html>
  );
}

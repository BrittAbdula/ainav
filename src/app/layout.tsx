import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/component/header";
import Footer from "@/components/component/footer";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics  } from '@next/third-parties/google';
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aiwebsiteslist.com'),
  title: "The world's best curated list of AI Websites",
  description: "Discover the best curated list of AI websites, featuring top resources, tools, and platforms for artificial intelligence enthusiasts and professionals",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The world's best curated list of AI Websites",
    description: "Discover the best curated list of AI websites, featuring top resources, tools, and platforms for artificial intelligence enthusiasts and professionals",
    type: "website",
    url: `https://aiwebsiteslist.com`,
    images: [
      {
        url: "https://aiwebsiteslist.com/ai-websites-list-og.png",
        width: 1200,
        height: 630,
        alt: "EmojiTell"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@emojitell",
    title: "The world's best curated list of AI Websites",
    description: "Discover the best curated list of AI websites, featuring top resources, tools, and platforms for artificial intelligence enthusiasts and professionals",
    images: ["https://aiwebsiteslist.com/ai-websites-list-1200.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Header />
          <SessionProvider>
            {children}
          </SessionProvider>
          <Footer />
        </div>
      </body>
      <GoogleAnalytics  gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}

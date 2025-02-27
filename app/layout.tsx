import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    template: "%s | d3h1 Blog Editor",
    default: "d3h1 Blog Editor",
  },
  description: "d3h1 Blog 에디터",
  metadataBase: new URL("https://editor.d3h1.com"),
  openGraph: {
    type: "website",
    url: "https://editor.d3h1.com",
    title: {
      template: "%s | d3h1 Blog Editor",
      default: "d3h1 Blog Editor",
    },
    description: "d3h1 Blog 에디터",
    siteName: "d3h1 Blog Editor",
    images: [{
      url: "/opengraph.png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://editor.d3h1.com",
    title: {
      template: "%s | d3h1 Blog Editor",
      default: "d3h1 Blog Editor",
    },
    description: "d3h1 Blog 에디터",
    images: [{
      url: "/opengraph.png",      
    }],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={noto_sans_kr.className}>
      <body>
        <Header />
        <main>
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: "d3h1 Blog Editor",
  description: "d3h1 Blog 에디터",
  openGraph: {
    type: "website",
    // url: "",
    title: "d3h1 Blog Editor",
    description: "d3h1 Blog 에디터",
    siteName: "d3h1 Blog Editor",
    // images: [{}]
  },
  twitter: {
    card: "summary_large_image",
    // site: "",
    title: "d3h1 Blog Editor",
    description: "d3h1 Blog 에디터",
    // image: [{}]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={noto_sans_kr.className}>
      <body>{children}</body>
    </html>
  );
}

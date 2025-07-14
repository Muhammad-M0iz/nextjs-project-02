import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PostIT - Share Your Stories with the World",
  description: "Join thousands of writers, creators, and thinkers sharing their ideas, experiences, and knowledge in our vibrant community. Create, discover, and engage with amazing content.",
  keywords: "blog, posts, writing, community, stories, ideas, creative writing, social platform",
  authors: [{ name: "PostIT Team" }],
  creator: "PostIT",
  publisher: "PostIT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://postIT.com",
    title: "PostIT - Share Your Stories with the World",
    description: "Join thousands of writers, creators, and thinkers sharing their ideas, experiences, and knowledge in our vibrant community.",
    siteName: "PostIT",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostIT - Share Your Stories with the World",
    description: "Join thousands of writers, creators, and thinkers sharing their ideas, experiences, and knowledge in our vibrant community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}

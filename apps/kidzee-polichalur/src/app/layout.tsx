import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Kidzee Polichalur — Preschool Activities & Events",
    template: "%s — Kidzee Polichalur",
  },
  description:
    "Explore exciting preschool activities, celebrations, and events at Kidzee Polichalur, Tamil Nadu. Annual days, sports events, festivals, and more.",
  keywords: [
    "Kidzee",
    "Polichalur",
    "preschool",
    "activities",
    "nursery",
    "Tamil Nadu",
    "kindergarten",
  ],
  authors: [{ name: "Kidzee Polichalur" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kidzee Polichalur",
    images: [
      {
        url: "/kidzee-logo.svg",
        width: 173,
        height: 56,
        alt: "Kidzee Polichalur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://kidzee-polichalur.vercel.app"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Lato:wght@300;400;700;900&family=Sniglet&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

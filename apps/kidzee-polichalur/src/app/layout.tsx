import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Kidzee Polichalur - Preschool Activities",
  description:
    "Explore the exciting activities and events at Kidzee Polichalur preschool. Annual days, sports, art, festivals, and more!",
  openGraph: {
    title: "Kidzee Polichalur - Preschool Activities",
    description: "Nurturing young minds with love, creativity, and joy.",
    type: "website",
  },
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

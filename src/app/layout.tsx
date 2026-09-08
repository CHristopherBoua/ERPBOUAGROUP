import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "BOUA GROUP ERP",
  description: "Système de gestion intégrée multi-filiales du groupe BOUA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground antialiased font-sans h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

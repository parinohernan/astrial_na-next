import React from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Proyecto Astrial Web",
  description: "Aplicación web para Proyecto Astrial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="flex flex-1">
            <Sidebar initialExpanded={true} />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

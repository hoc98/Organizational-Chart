import React, { ReactNode } from "react";
import "../styles/globals.css";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-gray-900  min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex w-full justify-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;

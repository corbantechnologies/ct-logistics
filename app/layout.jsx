"use client";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import BootstrapClient from "@/providers/BootstrapClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CT-Logistics</title>
        <meta
          name="description"
          content="CT-Logistics: Efficiently managing warehouses, optimizing routes, and streamlining distribution for businesses of all sizes."
        />
      </head>
      <body>
        <Toaster position="top-center" />
        <NextAuthProvider>
          <TanstackQueryProvider>
            {children}
            <Analytics />
          </TanstackQueryProvider>
        </NextAuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}

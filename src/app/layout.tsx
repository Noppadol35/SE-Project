"use client";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "src/app/styles/globals.css";
import SessionProvider from "./components/SessionProvider";
import Navbar from "./components/Navbar";

import { Jost } from "next/font/google";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "QR Menu",
  description: "Generated QR-Order Menu",
};

type Props = {
  children: ReactNode;
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin-ext"],
  display: "swap",
});

const theme = createTheme({
  primaryColor: "lime",
  primaryShade: 7,
  defaultRadius: "xs",
  fontFamily: "Jost, sans-serif",
  headings: {
    fontFamily: "Jost, sans-serif",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={jost.className} lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <ModalsProvider>
              <SessionProvider>
                <main className="h-screen flex flex-col justify-center items-center">
                  <Navbar />
                  {children}
                </main>
              </SessionProvider>
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

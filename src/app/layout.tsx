"use client";

import { ReactNode } from "react";
import { Jost } from "next/font/google";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "./styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import { SessionProvider } from "next-auth/react";

type Props = {
    children: ReactNode;
};

const jost = Jost({
    weight: ["300", "400", "500", "600", "700"],
    style: "normal",
    subsets: ["latin-ext"],
    display: "swap",
});

const theme = createTheme({
    primaryColor: "green",
    primaryShade: 7,
    defaultRadius: "md",
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

export default function Layout({ children }: Props) {
    return (
        <html className={jost.className} lang="en">
            <head>
                <ColorSchemeScript defaultColorScheme="light" />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider theme={theme} defaultColorScheme="light">
                        <Notifications />
                        <ModalsProvider>
                            <SessionProvider>
                                <main className=" h-screen justify-center items-center">
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
import "reflect-metadata";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { JSX } from "react";
import "./global.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "App",
  description: "My Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <Theme accentColor="indigo">{children}</Theme>
      </body>
    </html>
  );
}

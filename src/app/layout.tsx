import type { Metadata } from "next";
import "./globals.css";
import Providers from "./_providers/providers";
export const metadata: Metadata = {
  title: "Zighang",
  description: "Zighang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { Inter, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const serif = Hedvig_Letters_Serif({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: "Christmas Countdown - Get in the spirit.",
  description: "Watch the countdown live and get in the Christmas spirit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${serif.variable}`}>{children}</body>
    </html>
  );
}

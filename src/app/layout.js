import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import AosWrapper from "./components/AosWrapper";
import SiteChrome from "./SiteChrome";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Aya Sir G!",
  description: "Aya Sir G!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo_header.png" />
        <link rel="apple-touch-icon" href="/logo_header.png" />
      </head>
      <body className={poppins.variable}>
        <UserProvider>
          <AosWrapper>
            <SiteChrome position="top" />
            {children}
            <SiteChrome position="bottom" />
            <ToastContainer />
          </AosWrapper>
        </UserProvider>
      </body>
    </html>
  );
}


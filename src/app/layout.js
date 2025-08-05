import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import AosWrapper from "./components/AosWrapper";
import SiteChrome from "./SiteChrome";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import TranslateWrapper from "./components/translateWrapper/TranslateWrapper";

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
  icons: {
    icon: "/logo_header.png",          // Default favicon
    shortcut: "/logo_header.png",      // For Windows browsers
    apple: "/logo_header.png",         // For iOS devices
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <UserProvider>
          <AosWrapper>
            {/* {/* <TranslateWrapper />  */}
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


import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Billito",
  description: "Book your flight now",
  keywords: "flight booking, travel, Billito",
  author: "Abd eljalil Selamnia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

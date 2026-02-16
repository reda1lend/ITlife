import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "ITlife — школа практического IT",
  description: "Курсы, менторы, проекты и портфолио."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

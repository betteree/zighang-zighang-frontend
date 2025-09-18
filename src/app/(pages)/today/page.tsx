import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TodayShell from "./_components/TodayShell";

export default function TodayPage() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <TodayShell />
      <Footer />
    </div>
  );
}

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PersonalMain from "./_components/personalMain";

export default function PersonalPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <PersonalMain></PersonalMain>
      <Footer />
    </div>
  );
}

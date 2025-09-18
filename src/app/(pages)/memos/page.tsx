import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemoBoard from "./_components/MemoBoard";

export default function MemosPage() {
  return (
    <div className="md:flex flex-col items-center">
      <Header />
      <main className="flex flex-col mx-auto md:w-[70%] mb-[150px]">
        <h1 className="hidden md:block text-Heading1-24sb mt-[26px] mb-[24px] md:mt-[78px] md:mb-6">
          메모장 관리페이지
        </h1>
        <MemoBoard />
      </main>

      <Footer />
    </div>
  );
}

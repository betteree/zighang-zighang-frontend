import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemoBoard from "./_components/MemoBoard";

export default function MemosPage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col mx-auto w-[70%] mb-[150px]">
        <h1 className="text-Heading1-24sb mt-[78px] mb-6">메모장 관리페이지</h1>
        <MemoBoard />
      </main>

      <Footer />
    </div>
  );
}

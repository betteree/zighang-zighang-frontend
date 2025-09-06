import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import StatsSection from "@/app/_components/StatsSection";
import JobCategoryGrid from "@/app/_components/JobCategoryGrid";
import BannerSection from "@/app/_components/BannerSection";
import Footer from "@/components/Footer";
import { jobCategories } from "@/app/_constants/jobCategories";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="relative w-full md:px-10 md:max-w-screen-xl overflow-visible md:mx-auto">
        <SearchSection />
        <StatsSection />

        <div className="flex flex-col px-5 py-0 md:gap-9 md:px-[60px] md:pb-9">
          <JobCategoryGrid categories={jobCategories} />
          <BannerSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}

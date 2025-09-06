import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryClient from "./_components/CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  return (
    <div>
      <Header />
      <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
        <button
          data-activate="True"
          className="text-lg font-semibold h-16 border-b-[3px] border-neutral-700 inline-flex justify-center items-center gap-2.5 ml-4 mt-1 transition-colors md:ml-0 md:text-2xl"
        >
          전체공고
        </button>
      </div>
      <CategoryClient slug={slug} />
      <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10" />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryShell from "./_components/CategoryShell";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CategoryShell slug={slug} />
      <Footer />
    </div>
  );
}

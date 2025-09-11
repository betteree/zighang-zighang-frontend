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
    <div>
      <Header />
      <CategoryShell slug={slug} />
      <Footer />
    </div>
  );
}

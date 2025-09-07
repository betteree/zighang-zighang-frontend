import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSection from "./_components/FilterSection";
import RecruitmentHeader from "./_components/RecruitmentHeader";
import RecruitmentInfo from "./_components/RecruitmentInfo";
import RecruitmentContent from "./_components/RecruitmentContent";
import Separator from "./_components/Separator";
import SimilarRecruitments from "./_components/SimilarRecruitments";
import SidebarActions from "./_components/SidebarActions";

const mockRecruitment = {
  uid: "13f8be02-f11b-4294-b6b6-d46e5a71e16b",
  title: "Solution Architect, Public sector",
  company: {
    name: "AmazonWebServicesKorea",
  },
  imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
  hits: 41,
  content:
    '<main><img src="https://d2juy7qzamcf56.cloudfront.net/2025-08-14/a08240a0-e53f-4acc-b2b7-f928b92d3a2f.png" /></main>',
  recruitmentJobs: {
    "IT·개발": ["DevOps·SRE"],
  },
  types: [3],
  careers: [1],
};

const mockSimilarRecruitments = [
  {
    uid: "88320ad8-0f64-49df-89bc-62b7b28e0295",
    title: "Al Backend Engineer (경력) 채용",
    company: { name: "네이버웹툰" },
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2024-08-20/3cc83a66-e1c6-4301-ac53-f73410370bb4.png",
    recruitmentJobs: { "IT·개발": ["서버·백엔드"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "e483c222-2ca4-479d-b169-441d934aa4e8",
    title: "DevOps Engineer 채용",
    company: { name: "Hyperconnect" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3, 5],
    careers: [11],
  },
  {
    uid: "105410d9-ca43-4591-8826-8b3aab485a0d",
    title: "R & D 인프라 운영 경력 채용",
    company: { name: "AhnLab" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "0062553e-7f5a-455b-aaaf-396e42f905cb",
    title: "클라우드 엔지니어 (DevOps 1 Team) 경력 채용",
    company: { name: "메타넷티플랫폼" },
    imageUrl: "https://d2juy7qzamcf56.cloudfront.net/company/default.svg",
    recruitmentJobs: { "IT·개발": ["DBA"] },
    types: [3],
    careers: [1],
  },
  {
    uid: "5a077384-7c0f-483c-9455-f0a31cd44561",
    title: "Cloud Architect, Professional Services Korea",
    company: { name: "AWS" },
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2025-01-01/adf9224e-0436-4a7e-ac70-586f769f5636.png",
    recruitmentJobs: { "IT·개발": ["DevOps·SRE"] },
    types: [3],
    careers: [11],
  },
];

const mockRecCount = {
  count: 43,
};

export default function RecruitmentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <FilterSection />
      <div className="flex w-full xl:mx-36 xl:max-w-[1200px] xl:justify-center xl:gap-[132px] xl:px-0">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center px-4 xl:px-0">
            <div className="flex w-full flex-col items-center py-5">
              <RecruitmentHeader recruitment={mockRecruitment} />
              <RecruitmentInfo />
            </div>
            <div className="w-full"></div>
            <p className="hidden"></p>
            <div className="h-9"></div>
            <RecruitmentContent />
            <section className="w-full">
              <div className="h-9"></div>
            </section>
          </div>
          <Separator />
          <div className="md:h-12"></div>
          <SimilarRecruitments
            recruitments={mockSimilarRecruitments}
            recCount={mockRecCount}
          />
        </div>
        <SidebarActions />
      </div>
      <Footer />
    </main>
  );
}

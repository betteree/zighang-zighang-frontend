import HeroSection from "./_components/HeroSection";
import LoginButtons from "./_components/LoginButtons";
import PrivacyLinks from "./_components/PrivacyLinks";

export default function JoinPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative w-full md:px-10 md:max-w-screen-lg overflow-visible md:mx-auto">
        <section className="flex h-screen w-full flex-col items-center justify-center gap-10 md:gap-[50px]">
          <HeroSection />
          <LoginButtons />
          <PrivacyLinks />
        </section>
      </div>
    </main>
  );
}

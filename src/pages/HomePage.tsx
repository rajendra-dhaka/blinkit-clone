import { Footer, Header, Hero } from "../components";

export const HomePage = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden pb-4">
      <Header />
      <div className="px-32">
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

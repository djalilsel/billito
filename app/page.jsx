import Hero from "@/components/main/Hero";
import SearchBox from "@/components/main/SearchBox";
import SearchHistory from "@/components/main/SearchHistory";
import Suggestions from "@/components/main/Suggestions";
import CheapestFrom from "@/components/main/CheapestFrom";
import FAQ from "@/components/main/FAQ";
import Advantages from "@/components/main/Advantages";
import GetFlights from "@/components/GetFlights";

export default function Home() {
  return (
    <main className="">
      <div className="relative">
        <Hero />
        <div
          className="absolute w-full flex justify-center px-[200px]"
          style={{ top: `calc(100% - 113px)` }}
        >
          <SearchBox />
        </div>
      </div>
      <div className="px-[200px] relative my-[113px]">
        <SearchHistory />
        <Suggestions />
        <CheapestFrom />
        <FAQ />
      </div>
      <Advantages />
      <GetFlights />
    </main>
  );
}

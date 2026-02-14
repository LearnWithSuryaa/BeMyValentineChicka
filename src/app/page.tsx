import SequenceScroll from "@/components/hero/SequenceScroll";
import AboutUs from "@/components/sections/AboutUs";
import MemoryGallery from "@/components/sections/MemoryGallery";
import JourneyStats from "@/components/sections/JourneyStats";
import RelationshipQuiz from "@/components/sections/RelationshipQuiz";
import LoveLetter from "@/components/sections/LoveLetter";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative bg-burgundy">
      <SequenceScroll />
      <div className="relative z-10 -mt-[100vh] rounded-t-[3rem] overflow-hidden bg-burgundy shadow-2xl pb-20">
        <div id="story">
          <AboutUs />
        </div>
        <div id="memories">
          <MemoryGallery />
        </div>
        <div id="stats">
          <JourneyStats />
        </div>
        <div id="quiz">
          <RelationshipQuiz />
        </div>
        <div id="letter">
          <LoveLetter />
        </div>
        <FinalCTA />

        <footer className="py-12 text-center text-blush/40 text-sm">
          <p>Made with ❤️ just for you Chickaa.</p>
        </footer>
      </div>
    </main>
  );
}

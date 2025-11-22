import { LatestEvents } from "../../components/modules/Home/LatestEvents";
import { OddTab } from "../../components/modules/Home/OddTab";
import { CasinoThumbnails } from "../../components/modules/Home/CasinoThumbnails";
import { OddEvents } from "../../components/modules/Home/OddEvents";
const Home = () => {
  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className="flex w-full">
          <div className="w-full">
            <div className=" ">
              <div className="flex flex-col w-full h-full sm:gap-4">
                <LatestEvents />

                <div className="flex flex-col h-full w-full md:gap-1 overflow-auto">
                  <OddTab />
                  <div className="overflow-auto w-full">
                    <div className="flex flex-col gap-2 sm:gap-5">
                      <OddEvents />
                      <CasinoThumbnails />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

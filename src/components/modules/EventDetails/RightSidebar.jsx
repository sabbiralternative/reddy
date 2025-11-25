import { useSelector } from "react-redux";
import BetSlip from "./BetSlip";

const RightSidebar = () => {
  const { placeBetValues } = useSelector((state) => state.event);
  return (
    <div className="relative w-full hidden md:block">
      <div className="flex flex-col gap-2 relative w-[340px] z-50">
        <div className="recent-game flex flex-row justify-end items-center min-h-8 w-full mb-[0px] bg-primary">
          <div className="flex items-center cursor-pointer">
            {/* <img
              src="/assets/pointing-right-B6QZW1r9.png"
              className="finger-point"
            /> */}
            <span className="pr-4 font-bold text-white leading-4 underline">
              MAC88-YBOC102
            </span>
          </div>
        </div>
        <div>
          <div className="bg-primary h-fit text-nowrap rounded px-2 py-1 text-white cursor-pointer">
            Live stream
          </div>
        </div>
        <div className="bg-primary p-2 text-white">
          <div className="w-fit">
            <label className="flex items-center gap-2 cursor-pointer ">
              <input
                type="checkbox"
                className="accent-blue-500 h-5 w-5 cursor-pointer"
              />
              <span className="text-sm">1 Click Betting Enabled</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-primary h-fit text-nowrap rounded px-2 py-1 text-white">
            Place Bet
          </div>
          {placeBetValues && <BetSlip />}
        </div>
        <div className="w-full">
          <div className="bg-primary h-fit text-nowrap rounded px-2 py-1 text-white">
            My Bets (0)
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center text-[14px] text-[#757575] bg-neutral-200 h-full pt-7 pb-6">
              Place bet to see it here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

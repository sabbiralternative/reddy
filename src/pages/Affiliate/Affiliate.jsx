import "./affiliate.css";

import Footer from "../../components/modules/Affiliate/Footer";
import { useState } from "react";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";

const Affiliate = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="w-full h-full  lg:w-[54%] lg:pt-2">
      <Footer setTab={setTab} tab={tab} />
      <div className="no-scrollbar h-full overflow-y-auto">
        <div className="px-2 w-full">
          <div className="main-content">
            {tab === "dashboard" && (
              <div data-v-4c49d924 className="">
                <TodayStatusSection />
                <InviteSection />
                <TopFiveLossUser />
                <BonusInformation />
                <TodayProfitLoss />
              </div>
            )}

            {tab === "user-list" && (
              <div data-v-4c49d924 className="">
                <UserList />
              </div>
            )}
            {tab === "pnl" && (
              <div data-v-4c49d924 className="">
                <ProfitLoss />
              </div>
            )}
            {tab === "reports" && (
              <div data-v-4c49d924 className="">
                <Reports />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;

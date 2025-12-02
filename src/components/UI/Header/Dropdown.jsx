import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ setDropdown }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigate = (link) => {
    navigate(link);
    setDropdown(null);
  };
  return (
    <div
      className="bg-white h-auto w-44 z-[999] absolute origin-top-right right-0 rounded-md border border-gray1"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 4px 0px" }}
    >
      <div className="flex flex-col gap-1 py-2">
        <div className="flex flex-wrap w-full sm:hidden sm:flex-nowrap">
          <div className="flex flex-col items-center justify-center gap-1 text-xs p-1 bg-primary border-[2px] border-[grey] font-bold whitespace-nowrap cursor-pointer shadow-md transition-transform duration-300 overflow-hidden w-full">
            <p>Check your Bonuses 💰😍</p>
            <button className=" border-none px-[10px] py-[3px] rounded cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:animate-none blink-red-black">
              Claim Now
            </button>
          </div>
        </div>
        <div
          onClick={() => handleNavigate("/account-statement")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Account Statement
        </div>
        <div
          onClick={() => handleNavigate("/profit-loss-report")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Profit Loss Report
        </div>
        <div
          onClick={() => handleNavigate("/deposit-report")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Deposit Report
        </div>
        <div
          onClick={() => handleNavigate("/withdraw-report")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Withdraw Report
        </div>

        <div className="text-black1 text-sm px-2 cursor-pointer hover:underline ">
          Deposit Turnover
        </div>
        <div className="text-black1 text-sm px-2 cursor-pointer hover:underline ">
          Promotions
        </div>
        <div
          onClick={() => handleNavigate("/bet-history")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Bet History
        </div>
        <div
          onClick={() => handleNavigate("/affiliate")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Affiliate
        </div>
        <div className="text-black1 text-sm px-2 cursor-pointer hover:underline ">
          My wallet
        </div>
        <div
          onClick={() => handleNavigate("/bonus-statement")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Bonus Statement
        </div>
        <div
          onClick={() => handleNavigate("/stake-setting")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Stake Settings
        </div>
        <div className="text-black1 text-sm px-2 cursor-pointer hover:underline ">
          Language
        </div>
        <div
          onClick={() => handleNavigate("/rules")}
          className="text-black1 text-sm px-2 cursor-pointer hover:underline "
        >
          Rules
        </div>
        <div
          onClick={handleLogout}
          className="text-red1 border-t px-2 pt-2 border-gray1 cursor-pointer hover:underline"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

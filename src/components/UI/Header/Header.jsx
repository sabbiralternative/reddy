import { useLogo } from "../../../context/ApiProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Authorized from "./Authorized";
import Unauthorized from "./Unauthorized";

export const Header = () => {
  const navigate = useNavigate();

  const { logo } = useLogo();
  const { token } = useSelector((state) => state.auth);

  return (
    <header className="flex flex-col py-[5px] w-full bg-secondary gap-1">
      <div className="flex w-full gap-5 sm:gap-20 relative px-2">
        <div className="flex items-end gap-[4px] md:items-center cursor-pointer">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="home-icon"
            className="sm:hidden mb-[15px] h-[20px]"
          />
          <img
            onClick={() => navigate("/")}
            loading="lazy"
            src={logo}
            alt="Brand-Logo"
            className="object-contain shrink-0 gap-2 w-titleMobWidth h-titleMobHeight sm:w-titlewidth hidden lg:block"
          />
        </div>
        {token ? <Authorized /> : <Unauthorized />}
      </div>
    </header>
  );
};

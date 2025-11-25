import { useLogo } from "../../../context/ApiProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Authorized from "./Authorized";
import Unauthorized from "./Unauthorized";
import { Settings } from "../../../api";
import { useEffect } from "react";
import { setShowAppPopUp } from "../../../redux/features/global/globalSlice";
import AppPopup from "./AppPopUp";
import MobileDWButton from "./MobileDWButton";
import MobileMarquee from "./MobileMarquee";
import MobileSearch from "./MobileSearch";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logo } = useLogo();
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const { showAppPopUp, windowWidth } = useSelector((state) => state?.global);

  useEffect(() => {
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      localStorage.setItem("closePopupForForever", true);
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings?.apkLink) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);

  return (
    <header className="flex flex-col  py-0 pb-[5px] md:py-[5px] md:pb-0 w-full bg-secondary gap-1">
      {Settings?.apkLink && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      <div className="flex w-full gap-5 sm:gap-20 relative px-2">
        <div className="flex items-end gap-[4px] md:items-center cursor-pointer">
          <img
            onClick={() => navigate("/")}
            src="data:image/svg+xml,%3csvg%20width='16'%20height='14'%20viewBox='0%200%2016%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.1056%207.86406C15.5778%207.86406%2015.9944%207.48125%2015.9944%206.98633C16.0222%206.74023%2015.9111%206.52148%2015.6889%206.33008L14.2222%205.05859V1.75C14.2222%201.26602%2013.825%200.875%2013.3333%200.875H12.4444C11.9528%200.875%2011.5556%201.26602%2011.5556%201.75V2.75352L8.59722%200.191406C8.43056%200.0546875%208.20833%200%208.01389%200C7.81944%200%207.59722%200.0273438%207.40278%200.21875L0.277778%206.33008C0.0833333%206.52148%200%206.74023%200%206.98633C0%207.47852%200.388889%207.86406%200.888889%207.86406H1.77778V9.76992C1.775%209.79453%201.775%209.81914%201.775%209.84648V12.909C1.775%2013.5133%202.27222%2014.0027%202.88611%2014.0027H3.33056C3.36389%2014.0027%203.39722%2014%203.43056%2013.9973C3.47222%2014%203.51389%2014.0027%203.55556%2014.0027H4.44167H5.10833C5.72222%2014.0027%206.21944%2013.5133%206.21944%2012.909V12.2527V10.5027C6.21944%2010.0188%206.61667%209.62773%207.10833%209.62773H8.88611C9.37778%209.62773%209.775%2010.0188%209.775%2010.5027V12.2527V12.909C9.775%2013.5133%2010.2722%2014.0027%2010.8861%2014.0027H11.5528H12.4556C12.4944%2014.0027%2012.5333%2014.0027%2012.5722%2014C12.6028%2014.0027%2012.6333%2014.0027%2012.6639%2014.0027H13.1083C13.7222%2014.0027%2014.2194%2013.5133%2014.2194%2012.909V12.466C14.2278%2012.3949%2014.2333%2012.3211%2014.2333%2012.2445L14.2139%207.86406H15.1028H15.1056Z'%20fill='white'/%3e%3c/svg%3e"
            alt="home-icon"
            className="sm:hidden mb-[15px] h-[20px]"
          />
          <img
            onClick={() => navigate("/")}
            loading="lazy"
            src={logo}
            alt="Brand-Logo"
            className="object-contain shrink-0 gap-2 w-titleMobWidth h-titleMobHeight sm:w-titlewidth w-[100px] md:w-[150px]"
          />
        </div>
        {token ? <Authorized /> : <Unauthorized />}
      </div>
      <MobileDWButton />
      <div className="flex md:hidden gap-2 items-center h-[28px] ps-2">
        <MobileSearch />
        <MobileMarquee />
      </div>
    </header>
  );
};

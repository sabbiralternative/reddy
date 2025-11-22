import { useDispatch, useSelector } from "react-redux";
import { homeTab } from "../../../static/group";
import { setGroup } from "../../../redux/features/global/globalSlice";

export const OddTab = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.global);

  const handleChangeGroup = (item) => {
    dispatch(setGroup(item.group));
  };

  return (
    <div className="flex flex-0 uppercase">
      <div className="flex w-full overflow-hidden md:overflow-auto overflow-x-scroll md:pb-0.5 m-0 md:m-1 bg-primary sm:bg-transparent custom-scrollbar ios-scroll-fix">
        {homeTab?.map((tab) => {
          return (
            <div
              onClick={() => handleChangeGroup(tab)}
              key={tab.id}
              className={`hidden sm:block uppercase border-r-[1px] w-full text-center px-4 py-1.5 whitespace-nowrap border-primary text-base sm:text-md cursor-pointer ${
                tab.group === group ? "bg-primary text-white" : "bg-gray4"
              } `}
            >
              {tab.name}
            </div>
          );
        })}
        {homeTab?.map((tab) => {
          return (
            <div
              onClick={() => handleChangeGroup(tab)}
              key={tab.id}
              className={`flex gap-1 sm:hidden flex-col items-center w-full px-2 py-1.5 whitespace-nowrap text-xs sm:text-md font-bold cursor-pointer capitalize text-white ${
                tab.group === group ? "bg-secondary" : "bg-primary"
              }`}
            >
              <div className="h-[20px] w-[20px]">
                <img className="object-contain w-full h-full" src={tab.image} />
              </div>
              {tab.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

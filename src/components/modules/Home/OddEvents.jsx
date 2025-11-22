import { useSelector } from "react-redux";
import { useGroupQuery } from "../../../redux/features/events/events";
import { useNavigate } from "react-router-dom";

export const OddEvents = ({ homeTab }) => {
  const navigate = useNavigate();
  const { group } = useSelector((state) => state.global);
  const { data } = useGroupQuery(
    { sportsType: group },
    {
      pollingInterval: 1000,
    }
  );

  const filterSports =
    data &&
    Object.keys(data)?.filter((key) => {
      if (homeTab === "inPlay") {
        return data?.[key]?.visible === true && data?.[key]?.inPlay === 1;
      } else {
        return data?.[key]?.visible;
      }
    });

  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-2 sm:justify-end items-center pt-0.5 md:pt-0 px-1 text-[12px]">
        <div className="flex items-center text-black gap-[1.5px]">
          <p className="flex gap-1 items-center justify-center border rounded-full px-1.5 md:px-2 py-[1px] md:py-1 cursor-pointer border-black">
            <span>-</span>
            <span>LIVE</span>
          </p>
          <p className="flex gap-1 items-center justify-center border rounded-full px-1 md:px-2 py-[1px] md:py-1 min-w-16 md:min-w-20 cursor-pointer border-black">
            <span>-</span>
            <span>VIRTUAL</span>
          </p>
          <p className="flex gap-1 items-center justify-center border rounded-full px-1.5 md:px-2 py-[1px] md:py-1 min-w-16 md:min-w-20 cursor-pointer border-black">
            <span>-</span>
            <span>PREMIUM</span>
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-xs font-semibold whitespace-nowrap">
            View by:
          </span>
          <div className="relative inline-block w-full">
            <select
              id="select"
              className="rounded-[4px] text-[11px] outline-none bg-secondary text-white h-6 px-2 border-[1px] border-primary"
              style={{
                appearance: "none",
                backgroundRepeat: "no-repeat",
                backgroundPosition: `right 0.5rem
                                            center`,
                backgroundSize: "0.8em",
                paddingRight: "1.5rem",
              }}
            >
              <option value="TIME">TIME</option>
              <option value="COMPETITION">COMPETITION</option>
            </select>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="absolute right-[0.1rem] top-1/2 transform -translate-y-1/2 pointer-events-none text-white"
              height={22}
              width={22}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="md:h-auto md:overflow-visible h-[242px]">
        <div className="w-full h-full text-[#343a40] overflow-auto border-b border-gray1 sm:border-0 sm:overflow-hidden hide-scrollbar">
          <table className="w-full border-collapse hidden sm:table">
            <thead>
              <tr className="text-xs text-center border-y">
                <th className="text-left w-1/2 pl-3 border-b-2 h-[30px]">
                  Game
                </th>
                <th />
                <th colSpan={2}>1</th>
                <th colSpan={2}>x</th>
                <th colSpan={2}>2</th>
              </tr>
            </thead>
            <tbody>
              {data && Object.values(data).length > 0 ? (
                filterSports
                  ?.sort((keyA, keyB) => {
                    return data[keyA].sort - data[keyB].sort;
                  })
                  ?.sort((keyA, keyB) => {
                    if (
                      data[keyA].timeStatus === "Suspended" &&
                      data[keyB].timeStatus !== "Suspended"
                    ) {
                      return 1;
                    }
                    if (
                      data[keyA].timeStatus !== "Suspended" &&
                      data[keyB].timeStatus === "Suspended"
                    ) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((key, index) => {
                    return (
                      <tr
                        key={index + key}
                        className="border-b text-xs text-center"
                      >
                        <td>
                          <div className="flex gap-1 text-start pl-3">
                            {/* <img
                              width={15}
                              src="assets/ball-icon-black-D0x1QcFu.svg"
                              alt={4}
                            /> */}
                            <span className="text-sm text-[#343a40] hover:underline cursor-pointer">
                              {data?.[key]?.eventName}
                            </span>
                            <div className="flex items-center gap-2 ml-auto pr-3 font-bold">
                              {data[key]?.inPlay === 1 && (
                                <div className="rounded-full bg-green1 w-3 h-3" />
                              )}
                              {data[key]?.isFancy === 1 && (
                                <img
                                  width={18}
                                  src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.9517%2010.3636V11.9545H9.23864V10.3636H13.9517ZM10.3175%2018V9.81179C10.3175%209.25829%2010.4252%208.79924%2010.6406%208.43466C10.8594%208.07008%2011.1577%207.79664%2011.5355%207.61435C11.9134%207.43205%2012.3426%207.34091%2012.8232%207.34091C13.148%207.34091%2013.4446%207.36577%2013.7131%207.41548C13.9848%207.4652%2014.187%207.50994%2014.3196%207.54972L13.9418%209.14062C13.8589%209.11411%2013.7562%209.08925%2013.6335%209.06605C13.5142%209.04285%2013.3916%209.03125%2013.2656%209.03125C12.9541%209.03125%2012.737%209.10417%2012.6143%209.25C12.4917%209.39252%2012.4304%209.59304%2012.4304%209.85156V18H10.3175Z'%20fill='black'/%3e%3c/svg%3e"
                                  alt={4}
                                />
                              )}
                              {data[key]?.isBookmaker === 1 && (
                                <img
                                  width={18}
                                  src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.88494%2018V7.81818H5.96165C6.7107%207.81818%207.33546%207.92921%207.83594%208.15128C8.33641%208.37334%208.7126%208.68158%208.96449%209.07599C9.21638%209.46709%209.34233%209.91785%209.34233%2010.4283C9.34233%2010.826%209.26278%2011.1757%209.10369%2011.4773C8.9446%2011.7756%208.72585%2012.0208%208.44744%2012.2131C8.17235%2012.402%207.85748%2012.5362%207.50284%2012.6158V12.7152C7.89063%2012.7318%208.25355%2012.8411%208.59162%2013.0433C8.933%2013.2455%209.20975%2013.5289%209.42188%2013.8935C9.634%2014.2547%209.74006%2014.6856%209.74006%2015.1861C9.74006%2015.7263%209.60582%2016.2086%209.33736%2016.6328C9.07221%2017.0537%208.67945%2017.3868%208.15909%2017.6321C7.63873%2017.8774%206.9974%2018%206.23509%2018H1.88494ZM4.03764%2016.2401H5.79261C6.39252%2016.2401%206.83002%2016.1257%207.10511%2015.897C7.38021%2015.665%207.51776%2015.3568%207.51776%2014.9723C7.51776%2014.6906%207.44981%2014.442%207.31392%2014.2266C7.17803%2014.0111%206.98414%2013.8421%206.73224%2013.7195C6.48366%2013.5968%206.18703%2013.5355%205.84233%2013.5355H4.03764V16.2401ZM4.03764%2012.0788H5.63352C5.9285%2012.0788%206.19034%2012.0275%206.41903%2011.9247C6.65104%2011.8187%206.83333%2011.6695%206.96591%2011.4773C7.1018%2011.285%207.16974%2011.0547%207.16974%2010.7862C7.16974%2010.4183%207.03883%2010.1217%206.77699%209.89631C6.51847%209.67093%206.15057%209.55824%205.6733%209.55824H4.03764V12.0788ZM11.1408%207.81818H13.7956L16.5996%2014.6591H16.7189L19.5229%207.81818H22.1777V18H20.0897V11.3729H20.0051L17.3702%2017.9503H15.9483L13.3134%2011.348H13.2289V18H11.1408V7.81818Z'%20fill='black'/%3e%3c/svg%3e"
                                  alt={4}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="w-20 bg-sky1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[0]?.ex?.availableToBack[0]?.price ??
                              "-"}
                          </div>
                        </td>
                        <td className="w-20 bg-pink1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[0]?.ex?.availableToLay[0]?.price ??
                              "-"}
                          </div>
                        </td>
                        <td className="w-20 bg-sky1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[2]?.ex?.availableToBack[0]?.price ??
                              "-"}
                          </div>
                        </td>
                        <td className="w-20 bg-pink1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[2]?.ex?.availableToLay[0]?.price ??
                              "-"}
                          </div>
                        </td>
                        <td className="w-20 bg-sky1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[1]?.ex?.availableToBack[0]?.price ??
                              "-"}
                          </div>
                        </td>
                        <td className="w-20 bg-pink1 h-8">
                          <div className="flex items-center justify-center h-full">
                            {data[key]?.[1]?.ex?.availableToLay[0]?.price ??
                              "-"}
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <div>
                  <div>
                    <span> No events available right now</span>
                  </div>
                </div>
              )}
            </tbody>
          </table>
          <div className="flex flex-col bg-gray5 sm:hidden">
            {data && Object.values(data).length > 0 ? (
              filterSports
                ?.sort((keyA, keyB) => {
                  return data[keyA].sort - data[keyB].sort;
                })
                ?.sort((keyA, keyB) => {
                  if (
                    data[keyA].timeStatus === "Suspended" &&
                    data[keyB].timeStatus !== "Suspended"
                  ) {
                    return 1;
                  }
                  if (
                    data[keyA].timeStatus !== "Suspended" &&
                    data[keyB].timeStatus === "Suspended"
                  ) {
                    return -1;
                  }
                  return 0;
                })
                .map((key, index) => {
                  return (
                    <div
                      onClick={() => navigateGameList(key)}
                      key={index + key}
                      className="flex flex-col py-[0.25rem] px-1 md:px-4 gap-[1px] md:gap-1 text-xs border-b border-gray1 p-1"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="md:text-sm text-[#000] md:font-medium font-bold text-sm">
                            {data?.[key]?.eventName}
                          </span>
                          <span className="md:text-xxs text-[#ff5733] md:text-gray3">
                            {data?.[key]?.date}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2 px-2 font-bold">
                          {data[key]?.inPlay === 1 && (
                            <div className="rounded-full bg-green1 w-3 h-3" />
                          )}
                          {data[key]?.isTv === 1 && (
                            <p className="font-bold">TV</p>
                          )}

                          {data[key]?.isFancy === 1 && (
                            <p className="font-bold">F</p>
                          )}
                          {data[key]?.isBookmaker === 1 && (
                            <p className="font-bold">BM</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <div className="text-xs text-center flex-1 font-bold">
                            1
                          </div>
                          <div className="text-xs text-center flex-1 font-bold">
                            X
                          </div>
                          <div className="text-xs text-center flex-1 font-bold">
                            2
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-sky1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[0]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-pink1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[0]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-sky1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[2]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-pink1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[2]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-sky1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[1]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                          <div className="cursor-pointer market-btn-w flex flex-col items-center w-20">
                            <div className="flex w-full h-8 market-btn-h">
                              <div className="flex flex-col items-center justify-center bg-pink1 h-full w-full">
                                <div className="font-black">
                                  {" "}
                                  {data[key]?.[1]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </div>
                                <div className="text-[9px] text-center leading-none mb-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div>
                <div>
                  <span> No events available right now</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

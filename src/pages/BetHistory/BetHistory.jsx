import { useNavigate } from "react-router-dom";
import { useCurrentBets } from "../../hooks/currentBets";

const BetHistory = () => {
  const navigate = useNavigate();
  const { data: currentBets } = useCurrentBets();

  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className=" flex w-full ">
          <div className="w-full">
            <div className=" ">
              <div className="font-robotoCondensed border">
                <div className="bg-primary w-full text-white text-[18px] sm:text-[23px] py-1 pl-2">
                  <p>Bet History</p>
                </div>
                <div className="p-1">
                  <div className="px-2">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 mt-2 w-full lg:w-auto space-y-2 lg:space-y-0">
                      <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2">
                        <div className="flex items-center flex-row gap-2 justify-between w-full">
                          <div className="flex flex-col w-[50%]">
                            <input
                              id="from-date"
                              type="date"
                              min="2025-10-26"
                              max="2025-11-26"
                              className="border rounded h-10 lg:w-[192px] w-full p-2 border-gray-300 shadow-sm text-gray-500"
                              defaultValue="2025-11-19"
                            />
                          </div>
                          <div className="flex flex-col w-[50%]">
                            <input
                              id="to-date"
                              type="date"
                              max="2025-11-26"
                              className="border rounded h-10 lg:w-[192px] w-full p-2 border-gray-300 shadow-sm text-gray-500"
                              defaultValue="2025-11-26"
                            />
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="flex py-[7px] rounded-[4px] cursor-pointer bg-bg-[#007BFF] sm:bg-[#007BFF] text-white  md:w-[82px] w-full items-center justify-center">
                            Submit
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="overflow-x-auto p-2 w-full text-[12px]">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Title
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Type
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Nation
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Sports
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              User Rate
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Amount
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Place Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentBets?.length > 0 &&
                            currentBets?.map((item, index) => {
                              return (
                                <tr key={index} className>
                                  <td
                                    onClick={() => {
                                      navigate(
                                        `/event-details/${item?.eventTypeId}/${item?.eventId}`
                                      );
                                    }}
                                    className="border border-gray-300 p-2 underline cursor-pointer"
                                  >
                                    {item?.title}
                                  </td>
                                  <td className={`border border-gray-300 p-2 `}>
                                    {item?.betType}
                                  </td>
                                  <td className={`border border-gray-300 p-2 `}>
                                    {item?.nation}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    {item?.sports}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    {item?.userRate}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    ₹ {item?.amount}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    {item?.placeDate}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {currentBets?.length === 0 && (
                        <div className="flex items-center justify-center w-full py-20">
                          <h2 className="text-base ">No bet history found!</h2>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-4 border rounded-lg p-2">
                      <button
                        disabled
                        className=" active:opacity-70 px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        « Previous
                      </button>
                      <div className="px-4 py-2 bg-primary text-white rounded-lg">
                        1
                      </div>
                      <button
                        disabled
                        className=" active:opacity-70 px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        Next »
                      </button>
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

export default BetHistory;

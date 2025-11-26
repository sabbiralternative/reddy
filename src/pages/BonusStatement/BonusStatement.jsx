import moment from "moment/moment";
import { useBonusMutation, useBonusStatement } from "../../hooks/bonus";
import toast from "react-hot-toast";

const BonusStatement = () => {
  const { data, refetch } = useBonusStatement();
  const { mutate: claimBonus } = useBonusMutation();

  const handleShowMessage = (item) => {
    if (item?.is_claimed == 1) {
      return <span className="text-green-500">Bonus Claimed</span>;
    } else if (item?.is_claimed == 2) {
      return <span className="text-orange-500">Claim Pending</span>;
    } else if (item?.is_claimed == 3) {
      return <span className="text-red-500">Rejected</span>;
    } else if (item?.is_claimed == 0) {
      if (item?.is_wagering_complete == 1) {
        return (
          <button
            onClick={() => handleClaimBonus(item)}
            className="bg-green-500 px-2 rounded-sm py-1 text-white"
          >
            Claim
          </button>
        );
      } else if (item?.is_wagering_complete == 0) {
        return <span className="text-red-500">Wagering Incomplete</span>;
      }
    }
  };

  const handleClaimBonus = async (item) => {
    const payload = {
      type: "claimBonus",
      bonus_statement_id: item?.bonus_statement_id,
    };
    claimBonus(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetch();
          toast.success(data?.result);
        } else {
          toast.error(data?.result || "Something went wrong");
        }
      },
    });
  };

  const formateDate = (date) => {
    if (date) {
      const formateDate = moment(date).format("DD-MM-YYYY, h:mm a");
      return formateDate;
    }
  };
  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className=" flex w-full ">
          <div className="w-full">
            <div className=" ">
              <div className="font-robotoCondensed border">
                <div className="bg-primary w-full text-white text-[18px] sm:text-[23px] py-1 pl-2">
                  <p>Bonus Statement</p>
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
                              Bonus Amount
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Wagering Required
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Wagering Complete Amount
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Date Added:
                            </th>
                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Expiry Date
                            </th>

                            <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.length > 0 &&
                            data?.map((item, index) => {
                              console.log(item);
                              return (
                                <tr key={index} className>
                                  <td className="border border-gray-300 p-2 ">
                                    {item?.amount}
                                  </td>
                                  <td
                                    className={`border border-gray-300 p-2 ${
                                      item?.wagering_amount > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {item?.wagering_amount}
                                  </td>
                                  <td
                                    className={`border border-gray-300 p-2 ${
                                      item?.is_wagering_complete == 0
                                        ? "text-orange-500"
                                        : ""
                                    } ${
                                      item?.is_wagering_complete == 1
                                        ? "text-green-500"
                                        : ""
                                    }`}
                                  >
                                    {item?.wagering_complete_amount}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    {formateDate(item?.date_added)}
                                  </td>
                                  <td className="border border-gray-300 p-2 ">
                                    {formateDate(item?.expiry_date)}
                                  </td>

                                  <td className="border border-gray-300 p-2 ">
                                    {handleShowMessage(item)}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
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

export default BonusStatement;

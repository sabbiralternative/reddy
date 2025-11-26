import { Fragment, useState } from "react";
import { useAccountStatement } from "../../hooks/accountStatement";
import { Settings } from "../../api";
import ShowImage from "../../components/modals/ShowImage/ShowImage";
import Complaint from "../../components/modals/Complaint/Complaint";

const WithdrawReport = () => {
  const [complaintId, setComplaintId] = useState(null);
  const [image, setImage] = useState("");
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "WITHDRAW",
    status: "ALL",
  };
  const { data } = useAccountStatement(payload);

  return (
    <Fragment>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="withdraw"
        />
      )}
      {image && <ShowImage image={image} setShowImage={setImage} />}
      <div className="h-full sm:w-[85%] w-full sm:pt-2">
        <div className="w-full scrollbar-hide">
          <main className=" flex w-full ">
            <div className="w-full">
              <div className=" ">
                <div className="font-robotoCondensed border">
                  <div className="bg-primary w-full text-white text-[18px] sm:text-[23px] py-1 pl-2">
                    <p>Withdraw Report</p>
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
                                Amount
                              </th>
                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Image
                              </th>
                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Date Added
                              </th>
                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Date Modified
                              </th>
                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Reference No
                              </th>

                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Remark
                              </th>
                              <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                Status
                              </th>
                              {Settings.complaint && (
                                <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2">
                                  Action
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {data?.result?.length > 0 &&
                              data?.result?.map((item, index) => {
                                return (
                                  <tr key={index} className>
                                    <td className="border border-gray-300 p-2 ">
                                      {item?.amount}
                                    </td>
                                    <td
                                      className={`border border-gray-300 p-2 `}
                                    >
                                      {item?.image && (
                                        <img
                                          onClick={() => setImage(item?.image)}
                                          className="size-5"
                                          src={item?.image}
                                          alt="deposit-slip"
                                        />
                                      )}
                                    </td>
                                    <td
                                      className={`border border-gray-300 p-2 `}
                                    >
                                      {item?.date}
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                      {item?.date_modified}
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                      {item?.referenceNo}
                                    </td>

                                    <td className="border border-gray-300 p-2 ">
                                      {item?.remark}
                                    </td>

                                    <td
                                      className={`border border-gray-300 p-2 ${
                                        item?.status === "APPROVED"
                                          ? "text-green-500"
                                          : item?.status === "REJECTED"
                                          ? "text-red-500"
                                          : item?.status === "PENDING"
                                          ? "text-yellow-500"
                                          : ""
                                      }`}
                                    >
                                      {item?.status}
                                    </td>
                                    {Settings.complaint && (
                                      <td
                                        className={`border border-gray-300 p-2 flex items-center justify-center`}
                                      >
                                        <button
                                          style={{
                                            backgroundColor: "rgb(255 131 46)",
                                          }}
                                          onClick={() =>
                                            setComplaintId(item?.referenceNo)
                                          }
                                          className="px-3 py-1 text-x xs:text-xs sm:text-sm font-medium  text-white rounded"
                                        >
                                          Report Issue
                                        </button>
                                      </td>
                                    )}
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
    </Fragment>
  );
};

export default WithdrawReport;

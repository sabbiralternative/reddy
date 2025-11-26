const AccountStatement = () => {
  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className=" flex w-full ">
          <div className="w-full">
            <div className=" ">
              <div className="font-robotoCondensed border">
                <div className="bg-primary w-full text-white text-[18px] sm:text-[23px] py-1 pl-2">
                  <p>Account Statement</p>
                </div>
                <div className="p-1">
                  <div className="px-2">
                    <div className="flex  flex-col mt-4 w-full lg:w-auto lg:flex-row lg:space-x-2 lg:items-center space-y-2 lg:space-y-0">
                      <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2">
                        <div className="flex items-center flex-row gap-2 justify-between w-full">
                          <div className="flex flex-col w-[50%]">
                            <input
                              id="from-date"
                              type="date"
                              min="2025-10-26"
                              max="2025-11-26"
                              className="border rounded h-10 lg:w-[192px] w-full p-2 border-gray-300 shadow-sm text-gray-500"
                              defaultValue="2025-10-27"
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
                        <div className="relative mt-2 sm:mt-0 ">
                          <select className="border h-10 lg:w-[192px] w-full rounded p-2 border-gray-300 shadow-sm appearance-none pr-10">
                            <option value={-1}>All</option>
                            <option value={0}>Deposit </option>
                            <option value={1}>Withdraw</option>
                            <option value={2}>Settlement Deposit</option>
                            <option value={3}>Settlement Withdraw</option>
                            <option value={27}>Bet Settlement</option>
                            <option value="19-20-21" />
                            <option value="6-10-21-28-38-42">Rollback</option>
                            <option value="7-29">Voided</option>
                            <option value={45}>Bonus Redeemed</option>
                            <option value={46}>Bonus Rollback</option>
                            <option value={47}>Refund</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6a.95 .95 0 0 1 .073 .082l.006 .008l.016 .022l.042 .059l.009 .015l.007 .01l.014 .027l.024 .044l.007 .017l.01 .02l.012 .032l.015 .034l.007 .025l.008 .02l.005 .026l.012 .037l.004 .028l.006 .025l.003 .026l.006 .033l.002 .03l.003 .028v.026l.002 .033l-.002 .033v.026l-.003 .026l-.002 .032l-.005 .029l-.004 .03l-.006 .024l-.004 .03l-.012 .035l-.005 .027l-.008 .019l-.007 .026l-.015 .033l-.012 .034l-.01 .018l-.007 .018l-.024 .043l-.014 .028l-.007 .009l-.009 .016l-.042 .058l-.012 .019l-.004 .003l-.006 .01a1.006 1.006 0 0 1 -.155 .154l-.009 .006l-.022 .016l-.058 .042l-.016 .009l-.009 .007l-.028 .014l-.043 .024l-.018 .007l-.018 .01l-.034 .012l-.033 .015l-.024 .006l-.021 .009l-.027 .005l-.036 .012l-.029 .004l-.024 .006l-.028 .003l-.031 .006l-.032 .002l-.026 .003h-.026l-.033 .002h-12c-.89 0 -1.337 -1.077 -.707 -1.707l6 -6z" />
                              <path d="M18 13l.033 .002h.026l.026 .003l.032 .002l.031 .006l.028 .003l.024 .006l.03 .004l.035 .012l.027 .005l.019 .008l.026 .007l.033 .015l.034 .012l.018 .01l.018 .007l.043 .024l.028 .014l.009 .007l.016 .009l.051 .037l.026 .017l.003 .004l.01 .006a.982 .982 0 0 1 .154 .155l.006 .009l.015 .02l.043 .06l.009 .016l.007 .009l.014 .028l.024 .043l.005 .013l.012 .023l.012 .034l.015 .033l.007 .026l.008 .02l.005 .026l.012 .036l.004 .029l.006 .024l.003 .028l.006 .031l.002 .032l.003 .026v.026l.002 .033l-.002 .033v.026l-.003 .026l-.002 .032l-.006 .031l-.003 .028l-.006 .024l-.004 .03l-.012 .035l-.005 .027l-.008 .019l-.007 .026l-.015 .033l-.012 .034l-.01 .018l-.007 .018l-.024 .043l-.014 .028l-.007 .009l-.009 .016l-.042 .058l-.012 .019l-.004 .003l-.006 .01l-.073 .081l-6 6a1 1 0 0 1 -1.414 0l-6 -6c-.63 -.63 -.184 -1.707 .707 -1.707h12z" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="flex py-[7px] rounded-[4px] cursor-pointer bg-[#007BFF] sm:bg-[#007BFF] text-white  md:w-[82px] w-full items-center justify-center">
                            Submit
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto p-2 w-full text-[12px]">
                    <table className="min-w-full border-separate border-spacing-0 ">
                      <thead>
                        <tr>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            DATE
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Credit
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Debit
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Balance
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Transaction ID
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Sports
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize">
                            Remark
                          </th>
                          <th className="border bg-primary text-white lg:text-black lg:!bg-white border-gray-300 p-2 capitalize" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="wct-r  ">
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c0 wct-b-c"
                            style={{ width: "16%" }}
                          >
                            <div className="cursor-pointer text-nowrap">
                              26-11-25, 4:04:22 PM
                            </div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c1 wct-b-c"
                            style={{ width: "9%" }}
                          >
                            <div className="text-green-600 cursor-pointer">
                              +1000
                            </div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c2 wct-b-c"
                            style={{ width: "9%" }}
                          >
                            <div className="cursor-pointer">-</div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c3 wct-b-c"
                            style={{ width: "13%" }}
                          >
                            <div className="cursor-pointer">1000</div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c4 wct-b-c"
                            style={{ width: "16%" }}
                          >
                            16503671178
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c5 wct-b-c"
                            style={{ width: "13%" }}
                          >
                            <div className="capitalize cursor-pointer">-</div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c6 wct-b-c"
                            style={{ width: "19%" }}
                          >
                            <div className="cursor-pointer text-nowrap justify-center text-center">
                              -
                            </div>
                          </td>
                          <td
                            className=" border text-center border-gray-300 p-2 wct-b-c7 wct-b-c"
                            style={{ width: "5%" }}
                          >
                            <button className="text-gray-600 hover:text-gray-900">
                              ▶
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between items-center p-2" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountStatement;

import { useState } from "react";
import { data } from "../../static/rules";

const Rules = () => {
  const [ruleId, setRuleId] = useState(null);

  const handleOpenRuleTab = (id) => {
    if (id === ruleId) {
      setRuleId(null);
    } else {
      setRuleId(id);
    }
  };
  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className=" flex w-full ">
          <div className="w-full">
            <div className=" ">
              <div className="flex flex-col w-full px-4 py-4 h-full font-robotoCondensed bg-white rounded border border-[#00000020] text-white overflow-auto">
                <div className="flex flex-0 w-full bg-primary py-2 px-4">
                  <h3 className="text-lg font-medium">Rules</h3>
                </div>
                <div className="flex flex-col mt-4 flex-1 gap-1">
                  {data?.rules?.map((rule) => {
                    return (
                      <div key={rule.id}>
                        <button
                          onClick={() => handleOpenRuleTab(rule?.id)}
                          className=" active:opacity-70 flex justify-between items-center w-full px-2 py-2 text-left bg-primary text-white"
                        >
                          <span className="text-md">{rule?.title}</span>
                        </button>
                        <div
                          className="transition-all duration-500 overflow-hidden"
                          style={{
                            maxHeight: rule?.id === ruleId ? "3000px" : "0px",
                          }}
                        >
                          <div className="overflow-auto">
                            <table className="table-fixed w-full border border-gray-300 text-sm text-red-500 border-collapse">
                              <tbody>
                                {rule?.items?.map((item) => {
                                  return (
                                    <tr
                                      key={item}
                                      className="border border-gray-300"
                                    >
                                      <td className="px-3 py-2">{item}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rules;

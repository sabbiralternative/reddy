import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";

const MobileSearch = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  const handleNavigate = (item) => {
    const link = `/event-details/${item?.eventTypeId}/${item?.eventId}`;
    setSearchText("");
    setData([]);
    navigate(link);
  };

  return (
    <div className="flex gap-1">
      {showSearch ? (
        <div className="relative w-[200px]">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 pr-8 rounded-full h-7 text-black border border-gray-300 w-full focus:outline-none focus:ring-0"
          />
          <img
            onClick={() => setShowSearch(false)}
            src="data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.70615%201.70664C10.0968%201.31602%2010.0968%200.681641%209.70615%200.291016C9.31553%20-0.0996094%208.68115%20-0.0996094%208.29053%200.291016L4.9999%203.58477L1.70615%200.294141C1.31553%20-0.0964844%200.681152%20-0.0964844%200.290527%200.294141C-0.100098%200.684766%20-0.100098%201.31914%200.290527%201.70977L3.58428%205.00039L0.293652%208.29414C-0.0969726%208.68476%20-0.0969726%209.31914%200.293652%209.70977C0.684277%2010.1004%201.31865%2010.1004%201.70928%209.70977L4.9999%206.41602L8.29365%209.70664C8.68428%2010.0973%209.31865%2010.0973%209.70928%209.70664C10.0999%209.31602%2010.0999%208.68164%209.70928%208.29102L6.41553%205.00039L9.70615%201.70664Z'%20fill='black'/%3e%3c/svg%3e"
            alt="close"
            className="absolute right-2 top-3 transform -translate-y-1/2 h-3 w-3 cursor-pointer"
          />
          {data?.length > 0 && searchText?.length > 2 && showSearch && (
            <div className="flex flex-col max-h-[400px] overflow-auto bg-white text-black absolute border border-black z-10 w-full mt-1 rounded">
              {data?.map((item, idx) => {
                return (
                  <div
                    onClick={() => handleNavigate(item)}
                    key={idx}
                    className="p-2 border-b border-[#ccc] cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <div className="text-[16px] font-black">
                        {item?.eventType}
                      </div>
                      <div className="text-[16px]">{item?.openDate}</div>
                    </div>
                    <div className="text-[15px] font-normal pt-1 max-w-72 text-wrap">
                      {item?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center bg-white rounded-full cursor-pointer h-[28px] w-[28px]">
          <img
            onClick={() => setShowSearch(true)}
            loading="lazy"
            src="data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_33_14758)'%3e%3cpath%20d='M9.75%204.875C9.75%205.95078%209.40078%206.94453%208.8125%207.75078L11.7797%2010.7203C12.0727%2011.0133%2012.0727%2011.4891%2011.7797%2011.782C11.4867%2012.075%2011.0109%2012.075%2010.718%2011.782L7.75078%208.8125C6.94453%209.40312%205.95078%209.75%204.875%209.75C2.18203%209.75%200%207.56797%200%204.875C0%202.18203%202.18203%200%204.875%200C7.56797%200%209.75%202.18203%209.75%204.875ZM4.875%208.25C5.31821%208.25%205.75708%208.1627%206.16656%207.99309C6.57603%207.82348%206.94809%207.57488%207.26149%207.26149C7.57488%206.94809%207.82348%206.57603%207.99309%206.16656C8.1627%205.75708%208.25%205.31821%208.25%204.875C8.25%204.43179%208.1627%203.99292%207.99309%203.58344C7.82348%203.17397%207.57488%202.80191%207.26149%202.48851C6.94809%202.17512%206.57603%201.92652%206.16656%201.75691C5.75708%201.5873%205.31821%201.5%204.875%201.5C4.43179%201.5%203.99292%201.5873%203.58344%201.75691C3.17397%201.92652%202.80191%202.17512%202.48851%202.48851C2.17512%202.80191%201.92652%203.17397%201.75691%203.58344C1.5873%203.99292%201.5%204.43179%201.5%204.875C1.5%205.31821%201.5873%205.75708%201.75691%206.16656C1.92652%206.57603%202.17512%206.94809%202.48851%207.26149C2.80191%207.57488%203.17397%207.82348%203.58344%207.99309C3.99292%208.1627%204.43179%208.25%204.875%208.25Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_33_14758'%3e%3crect%20width='12'%20height='12'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
            alt="open-search-input-icon"
            className="object-contain shrink-0 self-stretch my-auto min-w-3 aspect-square"
          />
        </div>
      )}
    </div>
  );
};

export default MobileSearch;

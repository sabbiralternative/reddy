import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const Search = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);

  useCloseModalClickOutside(ref, () => {
    setSearchText("");
    setData([]);
    setShowSearch(false);
  });

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
    <div ref={ref} className="hidden md:flex gap-1">
      <div
        className={` ${
          showSearch
            ? "flex justify-center items-center gap-1 w-[200px]"
            : "p-1 cursor-pointer w-auto"
        }`}
      >
        {showSearch && (
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="All Events"
            className="p-2 pr-8 h-7 text-black border border-gray-300 w-full focus:outline-none focus:ring-0"
          />
        )}
        <img
          onClick={() => setShowSearch((prev) => !prev)}
          loading="lazy"
          src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.875%207.5V8.75C11.875%209.00781%2011.6641%209.21875%2011.4062%209.21875H9.21875V11.4062C9.21875%2011.6641%209.00781%2011.875%208.75%2011.875H7.5C7.24219%2011.875%207.03125%2011.6641%207.03125%2011.4062V9.21875H4.84375C4.58594%209.21875%204.375%209.00781%204.375%208.75V7.5C4.375%207.24219%204.58594%207.03125%204.84375%207.03125H7.03125V4.84375C7.03125%204.58594%207.24219%204.375%207.5%204.375H8.75C9.00781%204.375%209.21875%204.58594%209.21875%204.84375V7.03125H11.4062C11.6641%207.03125%2011.875%207.24219%2011.875%207.5ZM19.7266%2018.6211L18.6211%2019.7266C18.2539%2020.0937%2017.6602%2020.0937%2017.2969%2019.7266L13.3984%2015.832C13.2227%2015.6562%2013.125%2015.418%2013.125%2015.168V14.5312C11.7461%2015.6094%2010.0117%2016.25%208.125%2016.25C3.63672%2016.25%200%2012.6133%200%208.125C0%203.63672%203.63672%200%208.125%200C12.6133%200%2016.25%203.63672%2016.25%208.125C16.25%2010.0117%2015.6094%2011.7461%2014.5312%2013.125H15.168C15.418%2013.125%2015.6562%2013.2227%2015.832%2013.3984L19.7266%2017.293C20.0898%2017.6602%2020.0898%2018.2539%2019.7266%2018.6211ZM13.4375%208.125C13.4375%205.1875%2011.0625%202.8125%208.125%202.8125C5.1875%202.8125%202.8125%205.1875%202.8125%208.125C2.8125%2011.0625%205.1875%2013.4375%208.125%2013.4375C11.0625%2013.4375%2013.4375%2011.0625%2013.4375%208.125Z'%20fill='white'/%3e%3c/svg%3e"
          alt="open-search-input-icon"
          className="object-contain shrink-0 self-stretch my-auto min-w-5 aspect-square cursor-pointer"
        />
        {data?.length > 0 && searchText?.length > 2 && showSearch && (
          <div className="flex flex-col h-auto  overflow-auto bg-white text-black absolute border border-black z-10 w-auto mt-1 rounded top-[3rem]">
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

        {data?.length === 0 && searchText?.length > 4 && showSearch && (
          <div className="flex flex-col items-center justify-center h-[40px]  overflow-auto bg-white text-black absolute border border-black z-10 w-[200px] mt-1 rounded top-[3rem]">
            <div className="flex items-center justify-center w-full">
              No data found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

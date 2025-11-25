const MobileOddMatchBetTab = () => {
  return (
    <div className="block md:hidden">
      <div className="bg-secondary text-white flex justify-between">
        <div className="flex">
          <div className="font-black border-t border-t-white  px-2 text-[13px] py-1 cursor-pointer">
            Odds
          </div>
          <div className="font-bold px-2 text-[13px]  py-1 cursor-pointer">
            Matched Bet (0)
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="text-white"
            height={25}
            width={25}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25ZM15 5.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0v-8.5Zm-8.5 6a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5ZM8.584 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Zm3.58-1.25a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 640 512"
            className="h-5 w-5 mr-2 active:w-4 active:opacity-70 "
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileOddMatchBetTab;

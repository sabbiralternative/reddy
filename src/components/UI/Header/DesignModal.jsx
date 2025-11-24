const DesignModal = () => {
  return (
    <div
      className="bg-white h-auto w-44 z-[999] absolute origin-top-right right-0 rounded-md border border-gray1"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 4px 0px" }}
    >
      <div className="flex flex-col gap-1 py-1 pr-1">
        <button className=" active:opacity-70  text-black text-sm px-2 py-[6px] text-center last:border-b-0 border-b cursor-pointer hover:underline">
          {" "}
          Ultra
        </button>
        <button className=" active:opacity-70  text-black text-sm px-2 py-[6px] text-center last:border-b-0 border-b cursor-pointer hover:underline">
          {" "}
          Lotus
        </button>
        <button
          disabled
          className=" active:opacity-70  text-black text-sm px-2 py-[6px] text-center last:border-b-0 border-b cursor-pointer hover:underline"
        >
          {" "}
          ReddyGames
        </button>
      </div>
    </div>
  );
};

export default DesignModal;

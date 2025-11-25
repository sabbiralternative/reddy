import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import BetSlip from "./BetSlip";

const Fancy = ({ data }) => {
  const navigate = useNavigate();
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };
  return (
    <Fragment>
      <div className="flex w-full mt-1 font-robotoCondensed bg-secondary py-1 px-1 ">
        <button
          className=" active:opacity-70 w-[calc(100%-4px)] rounded bg-gray4 font-bold max-md:ms-1 text-white"
          style={{ background: "var(--gradiantStyle)" }}
        >
          FANCY
        </button>
      </div>
      <div className="flex lg:flex-row flex-col w-full">
        <div className="w-full flex gap-1">
          <div className="relative w-full flex flex-wrap gap-[0.5rem] items-start max-md:block ">
            <div className="columns-2-- gap-2-- max-lg:columns-2-- w-full">
              <div className="md:mb-2 break-inside-avoid-- ">
                <div className="w-full">
                  <table className="w-full border-separate border-spacing-y-[1px] ">
                    <thead>
                      <tr>
                        <th className="p-2 text-center" />
                        <th className="border px-2 md:p-2 text-center text-xs md:text-[16px] bg-pink1">
                          No
                        </th>
                        <th className="border px-2 md:p-2 text-center text-xs md:text-[16px] bg-sky1">
                          Yes
                        </th>
                        <th className="p-2 text-center" />
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {fancyData?.map((game) => {
                        const pnl =
                          pnlBySelection?.find(
                            (pnl) => pnl?.MarketId === game?.id
                          ) || {};

                        return (
                          <Fragment key={game?.id}>
                            <tr className="border-b bg-gray-200">
                              <td className="border-r px-2 text-[14px]  md:w-full ">
                                <div className="flex items-center justify-between gap-1">
                                  <div className="flex items-center justify-between w-full gap-1">
                                    {game?.name}
                                  </div>
                                </div>
                              </td>
                              <td colSpan={2} className="p-0 relative w-full">
                                <div className="flex flex-row">
                                  <div
                                    onClick={() =>
                                      handleBetSlip(
                                        "lay",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.lay?.[0]?.line,
                                        game?.runners?.[0]?.lay?.[0]?.price
                                      )
                                    }
                                    className="fancy-market-col border-r text-center bg-pink1 market-btn w-full "
                                  >
                                    <div className=" cursor-pointer  market-btn-w flex flex-col items-center w-28 ">
                                      <div className="flex w-full h-8 market-btn-h">
                                        <div className="flex flex-col  items-center justify-center bg-pink1 h-full w-full ">
                                          <div className="font-black">
                                            {" "}
                                            {game?.runners?.[0]?.lay?.[0]
                                              ?.line || "-"}
                                          </div>
                                          <div className="text-[9px] text-center leading-none mb-1">
                                            {
                                              game?.runners?.[0]?.lay?.[0]
                                                ?.price
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleBetSlip(
                                        "back",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.back?.[0]?.line,
                                        game?.runners?.[0]?.back?.[0]?.price
                                      )
                                    }
                                    className="fancy-market-col border-r text-center bg-sky1 market-btn w-full "
                                  >
                                    <div className=" cursor-pointer  market-btn-w flex flex-col items-center w-28 ">
                                      <div className="flex w-full h-8 market-btn-h">
                                        <div className="flex flex-col  items-center justify-center bg-sky1 h-full w-full ">
                                          <div className="font-black">
                                            {" "}
                                            {game?.runners?.[0]?.back?.[0]
                                              ?.line || "-"}
                                          </div>
                                          <div className="text-[9px] text-center leading-none mb-1">
                                            {
                                              game?.runners?.[0]?.back?.[0]
                                                ?.price
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="text-center md:gap-0.5 md:flex flex-row md:text-right text-[12px] md:text-[10px] pr-1 text-nowrap ">
                                  <div>MIN: {game?.minLiabilityPerBet}</div>
                                  <div>MAX: {game?.maxLiabilityPerBet}</div>
                                </div>
                              </td>
                            </tr>
                            {game?.id === runnerId && (
                              <tr className="inline-betslip md:hidden">
                                <td colSpan="12">
                                  <BetSlip />
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Fancy;

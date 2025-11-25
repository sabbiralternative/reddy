import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import { Status } from "../../../const";
import { cn } from "../../../utils/cn";
import BetSlip from "./BetSlip";

const Bookmaker = ({ data }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
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
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
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
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
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

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  return (
    <Fragment>
      {data?.length > 0 &&
        data?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
          );

          return (
            <div key={game?.id} className="relative">
              <div className="border border-gray-300">
                <div className="flex justify-between items-center bg-secondary text-white px-2 py-2">
                  <div className="flex items-center justify-start gap-1">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 576 512"
                      className="cursor-pointer max-h-[22px]"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Add To Multi Markets</title>
                      <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
                    </svg>
                    <span className="text-sm font-bold">
                      {" "}
                      {game?.name?.toUpperCase()}
                    </span>
                    {Settings.betFairCashOut &&
                      game?.runners?.length !== 3 &&
                      game?.status === "OPEN" &&
                      game?.name !== "toss" && (
                        <button
                          style={{
                            cursor: `${
                              !teamProfitForGame ? "not-allowed" : "pointer"
                            }`,
                            opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                          }}
                          onClick={() =>
                            handleCashOutPlaceBet(
                              game,
                              "lay",
                              dispatch,
                              pnlBySelection,
                              token,
                              teamProfitForGame
                            )
                          }
                          type="button"
                          className={`inline-block  leading-normal relative overflow-hidden  transition duration-150 ease-in-out  rounded-md px-2.5 py-1.5 text-center shadow-[inset_-12px_-8px_40px_#46464620] flex items-center justify-center flex-row h-max  max-w-[74%] mr-1 
    cursor-pointer ${
      teamProfitForGame?.profit > 0
        ? "bg-bg_cashOutBtnGrd"
        : "bg-bg_color_clearBtn"
    }`}
                        >
                          <div className="text-[10px] md:text-sm text-text_color_primary2 whitespace-nowrap  font-semibold">
                            Cashout{" "}
                            {teamProfitForGame?.profit &&
                              `(${teamProfitForGame.profit.toFixed(2)})`}
                          </div>
                        </button>
                      )}
                  </div>
                  <div className="bg-white w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center cursor-pointer text-black">
                    <p>i</p>
                  </div>
                </div>
              </div>
              <table className="w-full text-[14px] font-medium text-stone-900">
                <thead>
                  <tr className="py-2 text-[14px] font-medium whitespace-nowrap h-[32px] bg-white text-neutral-500">
                    <th className="w-[86%] text-left pl-3 capitalize text-teal">
                      MIN: {game?.minLiabilityPerBet} MAX:{" "}
                      {game?.maxLiabilityPerBet}
                    </th>
                    <th className="w-[7%]">BACK</th>
                    <th className="w-[7%]">LAY</th>
                  </tr>
                </thead>
                <tbody>
                  {game?.runners?.map((runner) => {
                    const pnl = pnlBySelection?.find(
                      (pnl) => pnl?.RunnerId === runner?.id
                    );
                    const predictOddValues = predictOdd?.find(
                      (val) => val?.id === runner?.id
                    );
                    return (
                      <Fragment key={runner?.id}>
                        <tr className="relative justify-between pr-6 mt-2 w-full pl-2 h-[32px] border-b border-white">
                          <td className="my-auto text-[14px] font-bold bg-gray5 px-2 flex-[6]">
                            <div> {runner?.name}</div>
                            <div />
                          </td>
                          <td>
                            <div className="flex overflow-hidden border-r border-white gap-[1px] web-view ">
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[0]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-sky1 py-1 w-full h-full">
                                    {runner?.back?.[0]?.price}
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[1]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-sky1 py-1 w-full h-full">
                                    {runner?.back?.[1]?.price}
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[2]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-sky1 opacity-50 py-1 w-full h-full">
                                    {runner?.back?.[2]?.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[0]?.price
                                )
                              }
                              className="mob-view "
                            >
                              <div
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-sky1 opacity-50 py-1 w-full h-full">
                                    {runner?.back?.[0]?.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="relative">
                            <div className="flex gap-[1px] web-view ">
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[0]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-pink1 opacity-50 py-1 w-full h-full">
                                    {runner?.lay?.[0]?.price}
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[1]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-pink1 py-1 w-full h-full">
                                    {runner?.lay?.[1]?.price}
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[2]?.price
                                  )
                                }
                                className={cn(
                                  "flex  flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-pink1 py-1 w-full h-full">
                                    {runner?.lay?.[1]?.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[0]?.price
                                )
                              }
                              className="mob-view  "
                            >
                              <div
                                className={cn(
                                  "flex flex-col h-8 market-btn-h items-center market-btn-w w-20 max-md:flex-1",
                                  runner?.status === Status.SUSPENDED &&
                                    "disabled"
                                )}
                              >
                                <div className="flex-1 w-full h-full">
                                  <div className="flex items-center justify-center bg-pink1 opacity-50 py-1 w-full h-full">
                                    {runner?.lay?.[0]?.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {runner?.status === Status.SUSPENDED && (
                              <div className="absolute top-0 right-0 w-[10.2rem] sm:w-[30.5rem]  h-[35px] flex items-center justify-center bg-suspendedBgBlack z-10">
                                <span className="text-suspendedTextRed font-bold uppercase">
                                  Suspended
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                        {runner?.id === runnerId && (
                          <tr className="inline-betslip">
                            <td colSpan="3">
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
          );
        })}
    </Fragment>
  );
};

export default Bookmaker;

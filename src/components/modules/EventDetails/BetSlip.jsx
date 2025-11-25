import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useBalance from "../../../hooks/balance";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useExposure } from "../../../hooks/exposure";
import { useOrderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setPredictOdd,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";
import { cn } from "../../../utils/cn";

const BetSlip = () => {
  const navigate = useNavigate();
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { price, stake, placeBetValues } = useSelector((state) => state.event);
  const { eventId } = useParams();
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchExposure } = useExposure(eventId);
  const [betDelay, setBetDelay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  useEffect(() => {
    dispatch(setPrice(placeBetValues?.price));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize.toFixed(2)
          : null
      )
    );
  }, [placeBetValues, dispatch]);

  useEffect(() => {
    if (betDelay <= 0) {
      setBetDelay(null);
    }
    dispatch(setPredictOdd([]));
  }, [placeBetValues, dispatch, betDelay]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */
  const handleOrderBets = async () => {
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ];
    setLoading(true);
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      delay = 9000;
    } else {
      setBetDelay(placeBetValues?.betDelay);
      delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    }

    setTimeout(async () => {
      const res = await createOrder(payloadData).unwrap();

      if (res?.success) {
        setLoading(false);
        refetchExposure();
        refetchBalance();
        refetchCurrentBets();
        setBetDelay("");
        toast.success(res?.result?.result?.placed?.[0]?.message);
        dispatch(setPlaceBetValues(null));
        dispatch(setRunnerId(null));
        dispatch(setStake(null));
      } else {
        setLoading(false);
        toast.error(
          res?.error?.status?.[0]?.description || res?.error?.errorMessage
        );
        setBetDelay(null);
      }
    }, delay);
  };

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  return (
    <div className={cn(loading && "relative opacity-75")}>
      {loading && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="animate-spin absolute inset-0 m-auto h-8 w-8 opacity-75"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="20" r="2"></circle>
          <circle cx="12" cy="4" r="2"></circle>
          <circle cx="6.343" cy="17.657" r="2"></circle>
          <circle cx="17.657" cy="6.343" r="2"></circle>
          <circle cx="4" cy="12" r="2.001"></circle>
          <circle cx="20" cy="12" r="2"></circle>
          <circle cx="6.343" cy="6.344" r="2"></circle>
          <circle cx="17.657" cy="17.658" r="2"></circle>
        </svg>
      )}
      <div
        className={` ${placeBetValues?.back ? "bg-[#72BBEF]" : "bg-[#FAA9BA]"}`}
      >
        <div
          className={`${
            placeBetValues?.back ? "bg-[#72BBEF]" : "bg-[#FAA9BA]"
          }  flex items-center pt-2 justify-between mx-2 gap-2`}
        >
          <div className="flex items-center w-full">
            {!placeBetValues?.isWeak && !placeBetValues?.cashout && (
              <button
                onClick={() =>
                  handleDecreasePrice(price, placeBetValues, dispatch, setPrice)
                }
                className=" active:opacity-70 flex bg-primary h-[30px] px-2 w-fit text-center items-center justify-center"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  color="white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "white" }}
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </button>
            )}

            <input
              readOnly={placeBetValues?.cashout}
              onChange={(e) => dispatch(setPrice(e.target.value))}
              value={price}
              type="number"
              className="h-[30px] w-full text-center text-[12px]"
            />
            {!placeBetValues?.isWeak && !placeBetValues?.cashout && (
              <button
                onClick={() =>
                  handleIncreasePrice(price, placeBetValues, dispatch, setPrice)
                }
                className=" active:opacity-70 flex bg-primary h-[30px] px-2 w-fit text-center items-center justify-center"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  color="white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "white" }}
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
            )}
          </div>
          <input
            readOnly={placeBetValues?.cashout}
            onChange={(e) => dispatch(setStake(e.target.value))}
            className="text-[12px] h-[30px] w-full leading-[30px] text-center text-black bg-white"
            type="text"
            placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
            value={stake}
            inputMode="numeric"
          />
        </div>
        <div className=" bg-[#72BBEF]  mx-1 grid grid-cols-4 gap-1 my-2.5 text-[14px]  text-center whitespace-nowrap text-stone-900">
          {parseButtonValues?.slice?.(0, 6)?.map((button, i) => (
            <button
              disabled={placeBetValues?.cashout}
              key={i}
              onClick={() => dispatch(setStake(button?.value))}
              className=" active:opacity-70 flex-1 rounded bg-[#ccc] border border-[#969494]"
              style={{ color: "rgb(0, 0, 0)" }}
            >
              {button?.value}
            </button>
          ))}
        </div>
        <div className="flex justify-between mb-1 gap-1 mx-2">
          {/* <button className=" active:opacity-70 flex-1 w-full text-sm h-8 rounded text-black bg-[#e8e817]">
            Min Stake
          </button>
          <button className=" active:opacity-70 flex-1 w-full  text-sm h-8 rounded  bg-blue-700 text-white">
            Max Stake
          </button>
          <button className=" active:opacity-70 flex-1 w-full  text-sm h-8 rounded  bg-green-700 text-white">
            Edit Stake
          </button> */}
          {/* <button className=" active:opacity-70 flex-1 w-full  text-sm h-8 rounded bg-red-600 text-white">
            Clear
          </button> */}
        </div>
        <div className="flex justify-between pb-2 gap-1 mx-2">
          <button
            onClick={() => {
              dispatch(setPredictOdd([]));
              dispatch(setPlaceBetValues(null));
              dispatch(setStake(null));
              dispatch(setRunnerId(null));
            }}
            className=" active:opacity-70 flex-1 text-sm h-8 w-full rounded bg-red-600 text-white"
          >
            Reset{" "}
          </button>
          {token ? (
            <button
              onClick={handleOrderBets}
              className=" active:opacity-70 flex-1 h-8 w-full border border-green-700 rounded text-sm bg-green-600 text-white"
            >
              Place Bet
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className=" active:opacity-70 flex-1 h-8 w-full border border-green-700 rounded text-sm bg-green-600 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetSlip;

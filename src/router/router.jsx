import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import EventDetails from "../pages/EventDetails/EventDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import StakeSetting from "../pages/StakeSetting/StakeSetting";
import Rules from "../pages/Rules/Rules";
import AccountStatement from "../pages/AccountStatement/AccountStatement";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import DepositReport from "../pages/DepositReport/DepositReport";
import WithdrawReport from "../pages/WithdrawReport/WithdrawReport";
import ProfitLossReport from "../pages/ProfitLossReport/ProfitLossReport";
import BetHistory from "../pages/BetHistory/BetHistory";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/stake-setting",
          element: <StakeSetting />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
        {
          path: "/account-statement",
          element: <AccountStatement />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "/deposit-report",
          element: <DepositReport />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/profit-loss-report",
          element: <ProfitLossReport />,
        },
        {
          path: "/bet-history",
          element: <BetHistory />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);

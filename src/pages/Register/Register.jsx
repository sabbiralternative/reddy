import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import useWhatsApp from "../../hooks/whatsapp";
import { Settings } from "../../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  useGetOtpMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { setShowBanner } from "../../redux/features/global/globalSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState({});
  const { data: socialLink } = useWhatsApp();
  const [timer, setTimer] = useState(null);
  const referralCode = localStorage.getItem("referralCode");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getOTP] = useGetOtpMutation();
  const [handleRegister] = useRegisterMutation();
  const { register, handleSubmit } = useForm();

  const handleOTP = async () => {
    const res = await getOTP({ mobile }).unwrap();
    if (res?.success) {
      setTimer(60);
      setOrder({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: "",
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();

    if (result.success) {
      if (window?.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: "User Signup",
          status: "success",
        });
      }
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const memberId = result?.result?.memberId;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;
      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      localStorage.setItem("token", token);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        navigate("/");
        toast.success("Register successful");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);
  return (
    <div className="h-full">
      <div className="flex justify-center h-screen w-screen bg-gradiantStyle">
        <main className="h-screen flex items-center">
          <div className="border bg-white rounded-lg w-[30%] min-w-[365px]">
            <section className="flex flex-col justify-center self-center px-4 py-3 text-sm font-medium bg-white rounded-lg border-4 max-w-[430px] text-black-900 font-bold">
              <button
                onClick={() => navigate(-1)}
                className=" active:opacity-70 flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-stone-900 w-[61px]"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                </svg>
                <span className="my-auto">Back</span>
              </button>
              <header className="flex flex-col justify-center self-center mt-2.5 max-w-full text-center w-[254px]">
                <h1 className="text-3xl font-semibold text-stone-900">
                  Sign Up
                </h1>
                <p className="text-base text-black-900 font-bold">
                  Create your account by following these simple steps.
                </p>
              </header>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col py-px mt-3 w-full text-sm font-medium"
              >
                <div className="mt-3">
                  <div className="flex gap-2.5 mt-3 text-black-900 font-bold text-opacity-60 relative">
                    <div className="w-[80px] p-[2px] h-[44px] flex items-center rounded-md border border-solid border-bg-grey">
                      <img src="data:image/webp;base64,UklGRnYBAABXRUJQVlA4TGkBAAAvEYAEEGfiOJJtpRoctp6G5p8MxVa/y70nDTeSJDlRosHl/z42jzpXazEzDBpJUtT3DJJew6t9Xcw44xC2bVFZn+BPZLGEEkEqmXQjePsRvABUPiCwwQGBwF4Pw/P7/XjKeTl42u/3+XxeFqKCp3nK+/2wMAux+KngaSr5/8VTfr+fym63kwrbcVV/N9f1skTq+311W/fA5CNZIITgP1jChRA4IW2E/igUggfJ3C79DySEIChTwxeeENR4FFyIOI8JRd5ydMA8NCuRv1J1/d5+iiVXrrVoTN/JlN1wGNm2mrzg7gR3ojjE3dH+G+JLCxH9nwBAR2GQAGlim6qqqroVYVxNxeoewlGJbQDwVcoAwKDR42dKnZUY5Gg87TPIcg7Rqy8H3SGiwCDZ1n7XYBHYeWe9as5QeUR10q4tKoji94N8bTfvD/L3EKgVONCcAXiJTFIAQJFIJAX++QtGvHKAVe5HWT7dOPgHAA==" />
                      <div>+91</div>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M128 192l128 128 128-128z" />
                      </svg>
                    </div>
                    <input
                      onChange={handleMobileNo}
                      type="tel"
                      id="phoneNumber"
                      className="flex items-center px-3 py-2 w-full h-[44px] bg-white rounded border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60 focus-within:outline-none focus-within:ring-2 focus-within:border-sky-200 focus-within:ring-sky-200"
                      placeholder="Enter Phone Number"
                      value={mobile}
                    />
                    {timer > 0 ? (
                      <button
                        type="button"
                        className="absolute right-2 top-2 active:opacity-70 gap-2.5 self-stretch text-xs font-semibold text-center text-white rounded-md shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 bg-secondary  px-3 py-2 cursor-auto"
                      >
                        Retry in {timer}
                      </button>
                    ) : (
                      <button
                        onClick={handleOTP}
                        type="button"
                        className="absolute right-2 top-2 active:opacity-70 gap-2.5 self-stretch text-xs font-semibold text-center text-white rounded-md shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 bg-secondary hover:bg-blue-700 px-3 py-2"
                      >
                        Get OTP on SMS
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="username"
                    className="self-start text-black-900 font-bold"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    id="username"
                    className="flex items-center px-3 py-2 w-full h-[44px] bg-white rounded border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60 focus-within:outline-none focus-within:ring-2 focus-within:border-sky-200 focus-within:ring-sky-200"
                    placeholder="Enter username"
                    defaultValue={868678678}
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="password"
                    className="self-start text-black-900 font-bold"
                  >
                    Password
                  </label>
                  <div className="flex items-center px-3 py-2 w-full h-[44px] bg-white rounded border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60 focus-within:outline-none focus-within:ring-2 focus-within:border-sky-200 focus-within:ring-sky-200">
                    <input
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full bg-transparent border-none focus:outline-none"
                      placeholder="Enter Password"
                    />
                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 576 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                        </svg>
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 640 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="password"
                    className="self-start text-black-900 font-bold"
                  >
                    Confirm Password
                  </label>
                  <div className="flex items-center px-3 py-2 w-full h-[44px] bg-white rounded border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60 focus-within:outline-none focus-within:ring-2 focus-within:border-sky-200 focus-within:ring-sky-200">
                    <input
                      {...register("confirmPassword", { required: true })}
                      type={showConfirmPassword ? "text" : "password"}
                      id="password"
                      className="w-full h-full bg-transparent border-none focus:outline-none"
                      placeholder="Enter Password"
                    />
                    <div
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 576 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                        </svg>
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 640 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="otp"
                    className="self-start text-black-900 font-bold"
                  >
                    OTP *
                  </label>
                  <div className="flex gap-2.5  text-black-900 font-bold text-opacity-60">
                    <input
                      {...register("otp", { required: true })}
                      type="text"
                      id="otp"
                      className="px-3 py-4  w-full bg-white rounded-lg border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60"
                      placeholder="Enter OTP received via SMS"
                    />
                  </div>
                  {/* <div className="label link">Resend in 29 sec</div> */}
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="otp"
                    className="self-start text-black-900 font-bold"
                  >
                    Referral Code (Optional)
                  </label>
                  <div className="flex gap-2.5 text-black-900 font-bold text-opacity-60">
                    <input
                      readOnly={referralCode}
                      {...register("referralCode")}
                      type="text"
                      id="otp"
                      className="px-3 py-4  w-full bg-white rounded-lg border border-solid border-neutral-200 text-black-900 font-bold text-opacity-60"
                      placeholder="Enter OTP received via SMS"
                      defaultValue={referralCode}
                    />
                  </div>
                  {/* <div className="label link">Resend in 29 sec</div> */}
                </div>
                <button
                  type="submit"
                  className=" active:opacity-70 gap-2.5 self-stretch px-16 py-3 mt-3 text-base font-semibold text-center text-white rounded-lg min-h-[44px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 bg-secondary hover:bg-blue-700"
                >
                  Sign Up
                </button>
                {socialLink?.whatsapplink && Settings.registrationWhatsapp && (
                  <Fragment>
                    <div className="w-full flex items-center gap-4 mt-3">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-text_color_loginTextColor text-sm font-medium">
                        Or
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <button
                      onClick={() => getWhatsAppId(socialLink?.whatsapplink)}
                      type="submit"
                      className=" active:opacity-70 gap-2.5 self-stretch px-16 py-3 mt-3 text-base font-semibold text-center text-white rounded-lg min-h-[44px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 bg-secondary hover:bg-blue-700"
                    >
                      Get Id on Whatsapp
                    </button>
                  </Fragment>
                )}

                <div className="self-center mt-3 text-sm text-center text-stone-900">
                  Already have account?{" "}
                  <Link
                    to="/login"
                    className=" text-blue-600 underline font-medium hover:text-blue-800 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;

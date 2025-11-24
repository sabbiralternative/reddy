import { Link, useNavigate } from "react-router-dom";
import { useLogo } from "../../context/ApiProvider";
import images from "../../assets/images";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../api";
import { setUser } from "../../redux/features/auth/authSlice";
import { setShowBanner } from "../../redux/features/global/globalSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  const handleDownloadAPK = () => {
    const fileUrl = Settings.apkLink;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="h-full">
      <div className="flex justify-center h-screen w-screen bg-gradiantStyle relative">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 m-2"
        >
          <img
            src="data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.70615%201.70664C10.0968%201.31602%2010.0968%200.681641%209.70615%200.291016C9.31553%20-0.0996094%208.68115%20-0.0996094%208.29053%200.291016L4.9999%203.58477L1.70615%200.294141C1.31553%20-0.0964844%200.681152%20-0.0964844%200.290527%200.294141C-0.100098%200.684766%20-0.100098%201.31914%200.290527%201.70977L3.58428%205.00039L0.293652%208.29414C-0.0969726%208.68476%20-0.0969726%209.31914%200.293652%209.70977C0.684277%2010.1004%201.31865%2010.1004%201.70928%209.70977L4.9999%206.41602L8.29365%209.70664C8.68428%2010.0973%209.31865%2010.0973%209.70928%209.70664C10.0999%209.31602%2010.0999%208.68164%209.70928%208.29102L6.41553%205.00039L9.70615%201.70664Z'%20fill='white'/%3e%3c/svg%3e"
            alt="cross-icon"
            className="h-4 w-4"
          />
        </div>
        <div className="flex w-[350px]  flex-col font-robotoCondensed justify-center items-center px-5 py-12 max-md:px-5 max-md:py-16">
          <div className="flex flex-col max-w-full w-full overflow-hidden">
            <img
              loading="lazy"
              src={logo}
              alt="Brand-Logo"
              className="object-contain self-center max-w-full aspect-[2.58] w-[200px] mb-2"
            />
            <div className="flex flex-col p-3 bg-white rounded overflow-hidden">
              <div className="flex items-center self-center text-2xl font-medium leading-tight text-center text-black whitespace-nowrap">
                <div className="self-stretch my-auto w-[66px]">LOGIN</div>
                <img
                  loading="lazy"
                  src="data:image/svg+xml,%3csvg%20width='17'%20height='23'%20viewBox='0%200%2017%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_33_10)'%3e%3cpath%20d='M3.94453%2020.575V14.1641C3.59219%2014.4133%203.23125%2014.6195%202.87461%2014.7742C1.5082%2015.3586%200%2014.3445%200%2012.875C0%2012.0758%200.468359%2011.4914%201.25039%2011.1562C2.46641%2010.6363%204.01328%207.77891%204.57188%206.53711C4.91563%205.76797%205.66758%205.3125%206.45391%205.3125H13.823C14.3301%205.3125%2014.7641%205.68203%2014.8414%206.18477C15.1551%208.1957%2016.4957%208.84023%2016.4871%2011.5C16.4871%2011.616%2016.4957%2012.0715%2016.4957%2012.1875C16.4957%2014.366%2015.5461%2015.6938%2013.432%2015.307C13.0324%2016.1062%2011.7348%2016.6262%2010.7551%2016.016C9.84414%2017.073%208.43906%2016.9871%207.70859%2016.2867V20.575C7.70859%2021.6148%206.84063%2022.5%205.82656%2022.5C4.82539%2022.5%203.94453%2021.5805%203.94453%2020.575ZM4.8125%203.59375V1.53125C4.8125%200.959766%205.27227%200.5%205.84375%200.5H14.0938C14.6652%200.5%2015.125%200.959766%2015.125%201.53125V3.59375C15.125%204.16523%2014.6652%204.625%2014.0938%204.625H5.84375C5.27227%204.625%204.8125%204.16523%204.8125%203.59375ZM13.9219%202.5625C13.9219%202.08984%2013.5352%201.70312%2013.0625%201.70312C12.5898%201.70312%2012.2031%202.08984%2012.2031%202.5625C12.2031%203.03516%2012.5898%203.42188%2013.0625%203.42188C13.5352%203.42188%2013.9219%203.03516%2013.9219%202.5625Z'%20fill='%23000'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_33_10'%3e%3crect%20width='16.5'%20height='22'%20fill='white'%20transform='translate(0%200.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.77] w-[17px]"
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-1">
                  <div className="flex flex-col w-full text-base font-medium rounded-none max-w-[275px] text-neutral-400 overflow-hidden">
                    <div className="flex gap-5 justify-between px-3 py-2 bg-white rounded border-b border-b-primary sm:border-b sm:border-b-primary md:border md:border-gray-300 md:rounded border-solid focus-within:outline-none focus-within:ring-2 focus-within:border-2 focus-within:ring-sky-200 focus-within:border-sky-200 focus-within:rounded-sm">
                      <input
                        {...register("username", { required: true })}
                        type="text"
                        id="userEmail"
                        placeholder="Enter Username or Mobile"
                        className="flex-grow outline-none bg-transparent text-neutral-700"
                      />
                      <img
                        loading="lazy"
                        src="data:image/svg+xml,%3csvg%20width='14'%20height='16'%20viewBox='0%200%2014%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7%208C9.20938%208%2011%206.20937%2011%204C11%201.79063%209.20938%200%207%200C4.79063%200%203%201.79063%203%204C3%206.20937%204.79063%208%207%208ZM9.8%209H9.27812C8.58437%209.31875%207.8125%209.5%207%209.5C6.1875%209.5%205.41875%209.31875%204.72188%209H4.2C1.88125%209%200%2010.8813%200%2013.2V14.5C0%2015.3281%200.671875%2016%201.5%2016H12.5C13.3281%2016%2014%2015.3281%2014%2014.5V13.2C14%2010.8813%2012.1187%209%209.8%209Z'%20fill='black'/%3e%3c/svg%3e"
                        className="hidden sm:block object-contain shrink-0 my-auto w-3.5 aspect-[0.87]"
                        alt="user icon"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 w-full text-base font-medium whitespace-nowrap rounded-none max-w-[275px] text-neutral-400 overflow-hidden ">
                    <div className="flex gap-5 justify-between px-3 py-2 bg-white rounded border-b border-b-[primary] sm:border-b sm:border-b-[primary] md:border md:border-gray-300 md:rounded border-solid focus-within:outline-none focus-within:ring-2 focus-within:border-2 focus-within:ring-sky-200 focus-within:border-sky-200 focus-within:rounded-sm">
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="flex-grow outline-none bg-transparent text-neutral-700 "
                      />
                      <img
                        loading="lazy"
                        src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16%205.5C16%208.5375%2013.5375%2011%2010.5%2011C10.15%2011%209.80625%2010.9656%209.475%2010.9031L8.725%2011.7469C8.65455%2011.8265%208.56796%2011.8903%208.47098%2011.9339C8.374%2011.9776%208.26885%2012.0001%208.1625%2012H7V13.25C7%2013.6656%206.66563%2014%206.25%2014H5V15.25C5%2015.6656%204.66563%2016%204.25%2016H0.75C0.334375%2016%200%2015.6656%200%2015.25V12.8094C0%2012.6094%200.078125%2012.4187%200.21875%2012.2781L5.275%207.22188C5.09688%206.68125%205%206.10313%205%205.5C5%202.4625%207.4625%200%2010.5%200C13.5469%200%2016%202.45312%2016%205.5ZM10.5%204C10.5%204.82812%2011.1719%205.5%2012%205.5C12.8281%205.5%2013.5%204.82812%2013.5%204C13.5%203.17188%2012.8281%202.5%2012%202.5C11.1719%202.5%2010.5%203.17188%2010.5%204Z'%20fill='black'/%3e%3c/svg%3e"
                        className="hidden sm:block object-contain shrink-0 my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Link className="text-blue2" to="/forgot-password">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 w-full ">
                    <button
                      type="submit"
                      className=" active:opacity-70 group relative flex items-center justify-center w-full px-4 py-2 text-sm sm:text-base text-white bg-secondary rounded min-h-[38px] hover:text-gray-500"
                    >
                      <span className="text-center group-hover:text-gray-800">
                        Login
                      </span>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b95f2455d32d0e8d5764c7f7f4c5a1cfca0c42673dd1fbf7c0ac06bc3691b884?placeholderIfAbsent=true&apiKey=f544c80c060347a09cb4361778d1925f"
                        alt="login icon"
                        className="ml-2 w-4 aspect-[1.33] object-contain group-hover:brightness-[0.3] md:absolute md:right-4 md:ml-0"
                      />
                    </button>
                  </div>
                  <button
                    onClick={loginWithDemo}
                    className=" active:opacity-70 group relative flex items-center justify-center w-full px-3 py-2 mt-1 text-base text-white bg-secondary rounded border border-solid min-h-[38px] hover:text-gray-500"
                  >
                    <span className="text-center group-hover:text-gray-800">
                      Login with Demo ID
                    </span>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b95f2455d32d0e8d5764c7f7f4c5a1cfca0c42673dd1fbf7c0ac06bc3691b884?placeholderIfAbsent=true&apiKey=f544c80c060347a09cb4361778d1925f"
                      alt="demo login icon"
                      className="ml-2 w-4 aspect-[1.33] object-contain group-hover:brightness-[0.3] md:absolute md:right-4 md:ml-0"
                    />
                  </button>
                  <div className="flex flex-col  w-full overflow-hidden">
                    <div className="flex flex-col items-start font-robotoCondensed w-full text-xs leading-none rounded-none max-md:pr-5">
                      <div className="text-black text-[17px] py-3 text-center w-full">
                        {"Don't"} have an account?{" "}
                        <Link
                          className="text-blue-600 underline font-medium hover:text-blue-800 transition-all duration-200"
                          to="/register"
                        >
                          Sign Up
                        </Link>
                      </div>
                      <div className="text-black pb-1">
                        This site is protected by reCAPTCHA and the Google
                      </div>
                      <div className="flex gap-2 text-blue2">
                        <div className="grow">Privacy Policy</div>
                        <div className="text-sm leading-none text-black">
                          and
                        </div>
                        <div>Terms of Service</div>
                        <div className="text-sm leading-none text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {Settings.apkLink && (
                <div
                  onClick={handleDownloadAPK}
                  className="bg-[#66bb6a] cursor-pointer w-full font-bold py-2 text-white flex justify-center items-center rounded mt-4 gap-2"
                >
                  <img
                    src={images.androidIcon}
                    alt="Android"
                    className="w-6 h-6"
                  />
                  <span>Download .apk</span>
                  <img
                    src="data:image/svg+xml,%3csvg%20width='9'%20height='13'%20viewBox='0%200%209%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.88661%2012.0572L0.302494%208.47312C0.0547678%208.2254%200.0547678%207.82482%200.302494%207.57973L0.89809%206.98413C1.14582%206.73641%201.54639%206.73641%201.79148%206.98413L4.33199%209.52464L6.8725%206.98413C7.12022%206.73641%207.5208%206.73641%207.76589%206.98413L8.36149%207.57973C8.60921%207.82746%208.60921%208.22803%208.36149%208.47312L4.77737%2012.0572C4.53491%2012.305%204.13434%2012.305%203.88661%2012.0572Z'%20fill='white'/%3e%3crect%20x='3.49048'%20y='0.243164'%20width='1.68664'%20height='9.27654'%20rx='0.421661'%20fill='white'/%3e%3c/svg%3e"
                    alt="Android"
                    className="w-4 h-4"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

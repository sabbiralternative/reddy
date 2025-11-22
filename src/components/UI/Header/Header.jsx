import { useLogo } from "../../../context/ApiProvider";

export const Header = () => {
  const { logo } = useLogo();

  return (
    <header className="flex flex-col py-[5px] w-full bg-secondary gap-1">
      <div className="flex w-full gap-5 sm:gap-20 relative px-2">
        <div className="flex items-end gap-[4px] md:items-center cursor-pointer">
          <img
            src={logo}
            alt="home-icon"
            className="sm:hidden mb-[15px] h-[20px]"
          />
          <img
            loading="lazy"
            src={logo}
            alt="Brand-Logo"
            className="object-contain shrink-0 gap-2 w-titleMobWidth h-titleMobHeight sm:w-titlewidth hidden lg:block"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 w-full overflow-x-auto overflow-y-hidden">
          <div className="flex gap-5 items-center self-end text-base md:mr-[10px] leading-none whitespace-nowrap text-white">
            <div className="flex gap-1">
              <div className="p-1 cursor-pointer w-auto">
                <img
                  loading="lazy"
                  src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.875%207.5V8.75C11.875%209.00781%2011.6641%209.21875%2011.4062%209.21875H9.21875V11.4062C9.21875%2011.6641%209.00781%2011.875%208.75%2011.875H7.5C7.24219%2011.875%207.03125%2011.6641%207.03125%2011.4062V9.21875H4.84375C4.58594%209.21875%204.375%209.00781%204.375%208.75V7.5C4.375%207.24219%204.58594%207.03125%204.84375%207.03125H7.03125V4.84375C7.03125%204.58594%207.24219%204.375%207.5%204.375H8.75C9.00781%204.375%209.21875%204.58594%209.21875%204.84375V7.03125H11.4062C11.6641%207.03125%2011.875%207.24219%2011.875%207.5ZM19.7266%2018.6211L18.6211%2019.7266C18.2539%2020.0937%2017.6602%2020.0937%2017.2969%2019.7266L13.3984%2015.832C13.2227%2015.6562%2013.125%2015.418%2013.125%2015.168V14.5312C11.7461%2015.6094%2010.0117%2016.25%208.125%2016.25C3.63672%2016.25%200%2012.6133%200%208.125C0%203.63672%203.63672%200%208.125%200C12.6133%200%2016.25%203.63672%2016.25%208.125C16.25%2010.0117%2015.6094%2011.7461%2014.5312%2013.125H15.168C15.418%2013.125%2015.6562%2013.2227%2015.832%2013.3984L19.7266%2017.293C20.0898%2017.6602%2020.0898%2018.2539%2019.7266%2018.6211ZM13.4375%208.125C13.4375%205.1875%2011.0625%202.8125%208.125%202.8125C5.1875%202.8125%202.8125%205.1875%202.8125%208.125C2.8125%2011.0625%205.1875%2013.4375%208.125%2013.4375C11.0625%2013.4375%2013.4375%2011.0625%2013.4375%208.125Z'%20fill='white'/%3e%3c/svg%3e"
                  alt="open-search-input-icon"
                  className="object-contain shrink-0 self-stretch my-auto min-w-5 aspect-square cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="self-stretch my-auto w-auto font-bold cursor-pointer">
                Rules
              </div>
            </div>
            <div className="flex gap-2">
              <a
                className="bg-primary text-white text-xs md:text-[16px] py-2 px-4"
                href="/register"
              >
                Sign Up
              </a>
              <a
                className="bg-white text-black text-xs md:text-[16px] py-2 px-4"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
          <div className="flex items-center h-full text-[13px] wrapper">
            <div className="marquee-text">
              <div
                className="marquee-text-track"
                style={{ "--speed": "0.77s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

import { useNavigate } from "react-router-dom";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StakeSetting = () => {
  const [editButtonValue] = useEditButtonValuesMutation();
  const navigate = useNavigate();
  const stakes = JSON.parse(localStorage.getItem("buttonValue"));
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      buttonGameValues: stakes,
    },
  });

  const buttonGameValues = watch("buttonGameValues");

  const onSubmit = async () => {
    const payload = {
      game: buttonGameValues?.map((btn) => ({
        label: parseFloat(btn?.label),
        value: parseFloat(btn?.value),
      })),
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonGameValues;
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };

  return (
    <div className="h-full sm:w-[85%] w-full sm:pt-2">
      <div className="w-full scrollbar-hide">
        <main className=" flex w-full ">
          <div className="w-full">
            <div className=" ">
              <div className="flex flex-col sm:border sm:rounded-[4px] h-full">
                <div className="bg-primary w-full text-white text-[18px] sm:text-[23px] py-1 pl-2">
                  <p>Change Button Values</p>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 px-2 overflow-auto py-5"
                >
                  <div className="flex justify-between max-w-[700px]">
                    <div className="flex flex-col w-1/2 pr-2">
                      <span className="mb-2 font-semibold">Price Label</span>
                      {stakes?.map((_, idx) => {
                        return (
                          <input
                            key={idx}
                            {...register(`buttonGameValues.${idx}.label`)}
                            className="mb-2 p-2 border border-gray-300 rounded placeholder:text-xs"
                            type="text"
                            placeholder="Enter Label"
                            defaultValue={100}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-col w-1/2 pl-2">
                      <span className="mb-2 font-semibold">Price Value</span>
                      {stakes?.map((_, idx) => {
                        return (
                          <input
                            key={idx}
                            {...register(`buttonGameValues.${idx}.value`)}
                            className="mb-2 p-2 border border-gray-300 rounded placeholder:text-xs"
                            type="text"
                            placeholder="Enter Label"
                            defaultValue={100}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" active:opacity-70 bg-blue2 mb-[20px] text-white flex justify-center   px-4 py-1.5 rounded-[4px] active:bg-secondary placeholder:text-xs w-full sm:w-[143px] "
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StakeSetting;

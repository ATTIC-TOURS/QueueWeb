import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "../../../../../shared/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../../../shared/validators/login";
import { useEffect } from "react";
import { useLoginMutation } from "../../../shared/api/auth";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../shared/stores/auth";

export default function PasswordForm() {
  const {
    formState: { errors },
    register,
    setValue,
    reset,
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const [$login, { isLoading, isError, data: res }] = useLoginMutation();

  const handleLogin: SubmitHandler<LoginType> = async (data) => {
    await $login(data);
  };

  const handleError: SubmitErrorHandler<LoginType> = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (branch_id) {
      setValue("id", branch_id);
    }
  }, [branch_id, setValue]);

  useEffect(() => {
    if (res) {
      if (res.status) {
        window.location.reload();
      } else {
        toast.error("Invalid Password");
        sessionStorage.removeItem("is_authenticated");
        reset();
        if (!branch_id) {
          window.location.reload();
        }
        setValue("id", branch_id!);
      }
    }
  }, [res, reset, setValue, branch_id]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin, handleError)}
        className="px-8 pt-6 pb-8 w-full"
      >
        <label className="text-sm text-onyx font-semibold mb-1">Password</label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-1 mb-2 bg-white-wash outline-none"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message}
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-xs italic">Invalid Password</p>
        )}
        {isLoading ? (
          <div className="rounded-md text-center w-full bg-crimson p-2 text-white animate-pulse">
            Authenticating...
          </div>
        ) : (
          <button
            className="bg-blood-red w-full p-3 text-white-wash font-bold rounded hover:bg-red-500"
            type="submit"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}

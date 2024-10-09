import { useBranchesQuery } from "../../shared/api/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../shared/stores/app";
import { setBranchName, setBranchId } from "../../../../shared/stores/branch";
import { IModalState, setModalStatus } from "../../../../shared/stores/modal";

export default function Branches() {
  const { data: branches, error, isLoading } = useBranchesQuery();

  const dispatch = useDispatch<AppDispatch>();

  const handleBranchClick = (branch_name: string, branch_id: string) => {
    const modal_status: IModalState = { active: true, modalFor: "Login" };
    dispatch(setModalStatus(modal_status));
    dispatch(setBranchId(branch_id));
    dispatch(setBranchName(branch_name));
  };

  return (
    <>
      {error && (
        <div className="text-center text-red-500">Something Went Wrong</div>
      )}
      {isLoading && !error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blood-red"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center gap-3 p-6 md:mt-24 md:gap-8 max-sm:grid-cols-1 max-md:grid-cols- max-xl:grid-cols-2">
          {branches?.map((branch, index) => {
            return (
              <button
                key={index}
                onClick={() =>
                  handleBranchClick(branch.name, branch.id.toString())
                }
                className="bg-blood-red w-full px-3 py-6 text-white-wash font-bold rounded border-4 border-white-wash shadow-xl hover:bg-red-500"
              >
                {branch.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

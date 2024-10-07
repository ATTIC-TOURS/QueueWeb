import { useContext } from "react";
import { branch_names } from "../../../../shared/data/branches";
import { ModalContext } from "../../shared/modal-ctx";

export default function Branches() {
  const branches = [...branch_names];

  const { setModalStatus, setModalTitle } = useContext(ModalContext);

  const handleBranchClick = (branch_name: string) => {
    setModalStatus(true);
    setModalTitle(branch_name);
  };
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center gap-3 p-6 md:mt-24 md:gap-8 max-sm:grid-cols-1 max-md:grid-cols- max-xl:grid-cols-2">
        {branches.map((branch_name, index) => {
          return (
            <button
              key={index}
              onClick={() => handleBranchClick(branch_name)}
              className="bg-blood-red w-full px-3 py-6 text-white-wash font-bold rounded border-4 border-white-wash shadow-xl hover:bg-red-500"
            >
              {branch_name}
            </button>
          );
        })}
      </div>
    </>
  );
}

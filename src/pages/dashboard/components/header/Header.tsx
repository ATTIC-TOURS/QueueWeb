import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, AppDispatch } from "../../../../shared/stores/auth";
import { clearBranch } from "../../../../shared/stores/branch";
export default function Header() {
  const branch_name = useSelector((state: IRootState) => state.branch.name);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white-wash h-14 py-3 shadow">
      <div className="flex justify-between items-center px-10">
        <h1 className="text-onyx font-bold">{branch_name}</h1>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          color="black"
          onClick={() => {
            dispatch(clearBranch());
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}

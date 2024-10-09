import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, AppDispatch } from "../../../../shared/stores/app";
import { clearBranch } from "../../../../shared/stores/branch";
import attic_logo from "../../../../assets/images/attic-logo-2.png";
export default function Header() {
  const branch_name = useSelector((state: IRootState) => state.branch.name);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white-wash h-14 py-3 shadow">
      <div className="flex justify-between items-center xs:px-3 md:px-10">
        <div className="flex gap-2">
          <img src={attic_logo} alt="Attic Logo" className="h-7 md:hidden" />
          <h1 className="text-onyx font-bold">{branch_name}</h1>
        </div>
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

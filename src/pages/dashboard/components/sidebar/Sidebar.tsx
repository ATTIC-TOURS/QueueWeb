import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import attic_logo from "../../../../assets/images/attic-logo.png";

export default function Sidebar() {
  return (
    <div className="bg-red-800 pt-3 max-lg:hidden">
      <img
        src={attic_logo}
        alt="Attic Tours Logo"
        className="h-10 w-1/2 mx-auto"
      />
      <div className="flex justify-center mt-5">
        <FontAwesomeIcon icon={faClock} color="white" className="h-10 w-1/2" />
      </div>
    </div>
  );
}

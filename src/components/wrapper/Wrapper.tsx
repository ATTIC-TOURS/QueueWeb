import { useSelector } from "react-redux";
import { IRootState } from "../../shared/stores/app";

export default function ModalWrapper({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { active } = useSelector((state: IRootState) => state.modal);
  return (
    <>
      {active && (
        <div
          className="flex justify-center items-center fixed inset-0 bg-rose-100 bg-opacity-50 max-xs:mx-3"
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
}

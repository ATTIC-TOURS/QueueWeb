import { useSelector } from "react-redux";
import { useMarqueeQuery } from "../../shared/api/tv";
import { IRootState } from "../../../../shared/stores/app";

export default function ScrollingText() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const { data } = useMarqueeQuery(branch_id ?? "");

  return (
    <footer
      className="bg-blood-red w-full h-16 overflow-hidden fixed bottom-0 left-0"
      id="scroll-container"
    >
      <div className="scroll-text flex items-center gap-4 h-full whitespace-nowrap">
        {data?.map((marquee, index) => (
          <h1 key={index} className="text-white-wash font-bold text-2xl w-full">
            {marquee.text}
          </h1>
        ))}
      </div>
    </footer>
  );
}

import { useSelector } from "react-redux";
import { useMarqueeQuery } from "../../shared/api/tv";
import { IRootState } from "../../../../shared/stores/app";

export default function ScrollingText() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const { data } = useMarqueeQuery(branch_id ?? "");

  return (
    <footer
      className="bg-blood-red w-full h-16"
      id="scroll-container"
    >
      <div className="text-white-wash font-bold scroll-text flex items-center gap-3 h-full">
        {data?.map((marquee, index) => (
          <h1 key={index}>{marquee.text}</h1>
        ))}
      </div>
    </footer>
  );
}

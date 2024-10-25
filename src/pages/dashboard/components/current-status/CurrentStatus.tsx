import { useCurrentStatus } from "../../../../hooks/useCurrentStatus";

export default function CurrentStatus() {
  const { stats } = useCurrentStatus();

  return (
    <div className="flex flex-wrap gap-5 items-center mt-4 justify-center">
      <div className="py-4 border-r text-center shadow-lg w-48">
        <h1 className="text-3xl font-normal">Now Serving</h1>
        <span className="text-3xl font-normal">{stats?.["in-progress"]}</span>
      </div>
      <div
        className={`py-4 border-r text-center shadow-lg w-48 ${
          stats && stats?.waiting > 0 ? "text-blood-red" : ""
        }`}
      >
        <h1 className="text-3xl font-normal">Waiting</h1>
        <span className="text-3xl font-normal">{stats?.waiting}</span>
      </div>
      <div className="py-4 border-r text-center shadow-lg w-48">
        <h1 className="text-3xl font-normal">Cancel</h1>
        <span className="text-3xl font-normal">{stats?.cancel}</span>
      </div>
    </div>
  );
}

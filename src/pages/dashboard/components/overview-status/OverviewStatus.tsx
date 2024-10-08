export default function OverviewStatus() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-3 shadow-lg">
      <div className="p-8 border-dotted border-r text-center">
        <h1 className="text-3xl font-semibold mb-3">Finish</h1>
        <span className="text-3xl font-semibold">55</span>
      </div>
      <div className="flex flex-wrap justify-center gap-5 items-center p-4">
        <div className="p-4 py-8 border-r text-center shadow-lg w-40">
          <h1 className="text-3xl font-normal">Pending</h1>
          <span className="text-3xl font-normal">12</span>
        </div>
        <div className="p-4 py-8 border-r text-center shadow-lg w-40">
          <h1 className="text-3xl font-normal">Complete</h1>
          <span className="text-3xl font-normal">43</span>
        </div>
      </div>
    </div>
  );
}

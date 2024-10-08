export default function CurrentStatus() {
  return (
    <div className="flex flex-wrap gap-5 items-center mt-8 justify-center">
      <div className="p-4 py-8 border-r text-center shadow-lg w-48">
        <h1 className="text-3xl font-normal">In-Progress</h1>
        <span className="text-3xl font-normal">12</span>
      </div>
      <div className="p-4 py-8 border-r text-center shadow-lg w-48">
        <h1 className="text-3xl font-normal">Waiting</h1>
        <span className="text-3xl font-normal">43</span>
      </div>
      <div className="p-4 py-8 border-r text-center shadow-lg w-48">
        <h1 className="text-3xl font-normal">Cancel</h1>
        <span className="text-3xl font-normal">43</span>
      </div>
    </div>
  );
}

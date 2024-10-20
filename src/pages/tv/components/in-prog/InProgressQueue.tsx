import { WaitingCallType } from "../../../../shared/types/tv";

export default function InProgressQueue({
  now_serving,
}: {
  now_serving: WaitingCallType[] | null;
}) {
  const formattedWindowName = (window_name: string) => {
    const window = window_name.split(" ");

    if (window[0] === "Window") {
      return window[1];
    }
    return window_name;
  };
  return (
    <article className="max-xl:px-2 overflow-hidden">
      <div className="bg-blood-red rounded-b h-[28rem]">
        <div className="bg-blood-red rounded-t p-4 flex justify-center items-center mx-auto shadow-lg">
          <h1 className="text-white-wash font-bold text-4xl text-center">
            NOW SERVING
          </h1>
        </div>
        <table className="w-full">
          <thead className="text-white-wash">
            <tr>
              <th className="border-r-2 py-2 w-1/2">NO</th>
              <th className="text-center">WINDOW</th>
            </tr>
          </thead>
          <tbody>
            {now_serving?.map((ticket, index) => (
              <tr key={index} className="py-2 in-prog-list">
                <td className="text-white-wash text-center text-4xl font-bold border-r-2 py-2">
                  {ticket.queue_code}
                </td>
                <td className="text-white-wash text-center text-4xl">
                  {formattedWindowName(ticket.window_name)}
                </td>
              </tr>
            ))}
            {Array.from({
              length: 7 - (now_serving?.length || 0),
            }).map((_, index) => (
              <tr key={`filler-${index}`} className="py-2 in-prog-list">
                <td className="text-transparent text-center text-4xl font-bold border-r-2 py-2">
                  -
                </td>
                <td className="text-transparent text-center text-4xl">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

import { useCallWebSocket } from "../../../../hooks/useCallWebSocket";
import { useQueueTickets } from "../../../../hooks/useQueueTickets";
import { useWindows } from "../../../../hooks/useWindows";

export default function InProgressQueue() {
  const { in_progress_tickets } = useQueueTickets();

  const { windows_name } = useWindows();

  const { in_progress_call } = useCallWebSocket();

  
  return (
    <article className="right-tv pt-10 max-xl:px-2">
      <div className="bg-blood-red h-16 w-96 rounded flex justify-center items-center mx-auto">
        <h1 className="text-white-wash font-bold text-4xl">Now Serving</h1>
      </div>
      <article className="mt-10 mb-20 w-96 mx-auto h-96 xl-2:h-[85%]">
        <div className="bg-blood-red rounded h-full">
          <section className="py-8">
            <h1 className="text-white-wash text-center font-bold text-9xl">
              {(in_progress_call &&
                in_progress_call[0] &&
                in_progress_call[0].queue_no) ??
                (in_progress_tickets &&
                  in_progress_tickets[0] &&
                  in_progress_tickets[0].queue_no)}
            </h1>
            <p className="text-white-wash text-center text-4xl">
              {(in_progress_call &&
                in_progress_call[0] &&
                windows_name(in_progress_call[0].window_id)) ??
                (in_progress_tickets &&
                  in_progress_tickets[0] &&
                  windows_name(in_progress_tickets[0].window_id))}
            </p>
          </section>
          <section className="pb-10">
            {(in_progress_call &&
              in_progress_call[1] &&
              in_progress_call.slice(1).map((ticket, index) => (
                <div
                  key={index}
                  className="flex justify-around py-2 in-prog-list"
                >
                  <h1 className="text-white-wash text-center text-2xl font-bold">
                    {ticket.queue_no}
                  </h1>
                  <p className="text-white-wash text-center text-2xl">
                    {windows_name(ticket.window_id)}
                  </p>
                </div>
              ))) ||
              (in_progress_tickets &&
                in_progress_tickets[1] &&
                in_progress_tickets.slice(1).map((ticket, index) => (
                  <div
                    key={index}
                    className="flex justify-around py-2 in-prog-list"
                  >
                    <h1 className="text-white-wash text-center text-2xl font-bold">
                      {ticket.queue_no}
                    </h1>
                    <p className="text-white-wash text-center text-2xl">
                      {windows_name(ticket.window_id)}
                    </p>
                  </div>
                )))}
          </section>
        </div>
      </article>
    </article>
  );
}

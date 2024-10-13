import { useCallWebSocket } from "../../../../hooks/useCallWebSocket";
import { useQueueTickets } from "../../../../hooks/useQueueTickets";

export default function WaitingQueue() {
  const { waiting_call } = useCallWebSocket();

  const { waiting_tickets } = useQueueTickets();

  return (
    <article className="right-tv pt-10 max-xl:px-2">
      <div className="bg-blood-red h-16 w-72 rounded flex justify-center items-center mx-auto">
        <h1 className="text-white-wash font-bold">WAITING</h1>
      </div>
      <article className="mt-10 mb-5 w-72 mx-auto h-96">
        <div className="bg-blood-red rounded h-full">
          <div className="pb-10 pt-5 grid grid-cols-4">
            {!waiting_call
              ? waiting_tickets?.map((ticket, index) => (
                  <div key={index} className="flex justify-around py-2">
                    <h1 className="text-white-wash text-center text-2xl font-bold">
                      {ticket.queue_no}
                    </h1>
                  </div>
                ))
              : waiting_call?.map((ticket, index) => (
                  <div key={index} className="flex justify-around py-2">
                    <h1 className="text-white-wash text-center text-2xl font-bold">
                      {ticket.queue_no}
                    </h1>
                  </div>
                ))}
          </div>
        </div>
      </article>
    </article>
  );
}

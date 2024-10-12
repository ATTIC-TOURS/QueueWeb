import {
  faArrowRotateRight,
  faFilter,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatTime } from "../../../../utils/time-formatter";
import { useServices } from "../../../../hooks/useServices";
import { useWindows } from "../../../../hooks/useWindows";
import TableActions from "./components/actions/TableActions";
import { useViewableStatus } from "../../../../hooks/useViewableStatus";
import { useQueueTickets } from "../../../../hooks/useQueueTickets";
import { useState } from "react";
import { QueueTicketType } from "../../../../shared/types/queue-ticket";

export default function TransactionTable() {
  const { isTicketSuccess, tickets, branch_id, refetch, isFetching } =
    useQueueTickets();

  const { isServicesLoading, services_name } = useServices();

  const { isWindowLoading, windows_name } = useWindows();

  const { viewableStatus } = useViewableStatus();

  const [filtered_tickets, setFilteredTickets] = useState<
    QueueTicketType[] | undefined
  >([]);

  const checkIfDone = (status_id: string) => {
    const checked = viewableStatus.some(
      (status) => status.id.toString() === status_id
    );

    return checked;
  };

  const handleServiceFilter = () => {
    const filtered = tickets?.filter((ticket) =>
      services_name(ticket.service_id)?.includes("Others")
    );

    setFilteredTickets(filtered);
  };

  if (!branch_id) return <div>No branch ID available</div>;
  if (!isTicketSuccess) return <div>Loading tickets...</div>;
  if (isServicesLoading) return <div>Loading services...</div>;
  if (isWindowLoading) return <div>Loading windows...</div>;

  return (
    <div className="md:px-16 max-md:px-2 mb-5">
      <table className=" w-full">
        <thead className="">
          <tr>
            <th className="py-4">
              Service
              <FontAwesomeIcon
                icon={faFilter}
                size="1x"
                color="grey"
                onClick={handleServiceFilter}
              />
            </th>
            <th>
              Queue No
              {/* // Might have to remove filter for Queue no. */}
              {/* <FontAwesomeIcon icon={faFilter} size="1x" color="grey" /> */}
            </th>
            <th>
              Visit Time
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
            <th>
              Window
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
            <th className="float-end">
              {isFetching ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="1x"
                  color="grey"
                  className="float-end"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowRotateRight}
                  size="1x"
                  color="grey"
                  onClick={refetch}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered_tickets && filtered_tickets.length > 0
            ? filtered_tickets?.map((item, index) => (
                <tr
                  key={index}
                  className={`border ${
                    item.is_called && !checkIfDone(item.status_id.toString())
                      ? "bg-slate-500"
                      : ""
                  }`}
                >
                  <td className="text-center">
                    {services_name(item.service_id)}
                  </td>
                  <td className="text-center">{item.queue_no}</td>
                  <td className="text-center">{FormatTime(item.created_at)}</td>
                  <td className="text-center">
                    {windows_name(item.window_id) ?? "unassigned"}
                  </td>
                  <td className="py-3 text-center ">
                    <TableActions ticket={item} />
                  </td>
                </tr>
              ))
            : tickets?.map((item, index) => (
                <tr
                  key={index}
                  className={`border ${
                    item.is_called && !checkIfDone(item.status_id.toString())
                      ? "bg-slate-500"
                      : ""
                  }`}
                >
                  <td className="text-center">
                    {services_name(item.service_id)}
                  </td>
                  <td className="text-center">{item.queue_no}</td>
                  <td className="text-center">{FormatTime(item.created_at)}</td>
                  <td className="text-center">
                    {windows_name(item.window_id) ?? "unassigned"}
                  </td>
                  <td className="py-3 text-center ">
                    <TableActions ticket={item} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

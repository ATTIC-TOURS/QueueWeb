import {
  faArrowRotateRight,
  faFilter,
  faSortDown,
  faSortUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatTime } from "../../../../utils/time-formatter";
import { useServices } from "../../../../hooks/useServices";
import { useWindows } from "../../../../hooks/useWindows";
import TableActions from "./components/actions/TableActions";
import { useViewableStatus } from "../../../../hooks/useViewableStatus";
import { useQueueTickets } from "../../../../hooks/useQueueTickets";
import { useEffect, useState } from "react";
import { QueueTicketType } from "../../../../shared/types/queue-ticket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../../../shared/stores/app";
import { setModalStatus } from "../../../../shared/stores/modal";
import {
  IFilterFor,
  setFilterFor,
} from "../../../../shared/stores/table-filter";
import { useCurrentStatus } from "../../../../hooks/useCurrentStatus";
import { useAuthSession } from "../../../../hooks/useAuthSession";
import { useCallWebSocket } from "../../../../hooks/useCallWebSocket";

export default function TransactionTable() {
  const { isTicketSuccess, tickets, branch_id, refetch, isFetching } =
    useQueueTickets();

  const { refetch: RefetchCurrentStatus } = useCurrentStatus();

  const { isServicesLoading, services_name } = useServices();

  const { isWindowLoading, windows_name } = useWindows();

  const { viewableStatus } = useViewableStatus();

  const [filtered_tickets, setFilteredTickets] = useState<
    QueueTicketType[] | undefined
  >([]);

  const dispatch = useDispatch<AppDispatch>();

  const filter = useSelector((state: IRootState) => state.service_filter);

  const user_id = useAuthSession().id;

  const called_by = useSelector((state: IRootState) => state.called_by_tickets);

  const { called } = useCallWebSocket();

  // TODO: Use a custom hook to optimize this
  const checkIfDone = (status_id: string) => {
    const checked = viewableStatus.some(
      (status) => status.id.toString() === status_id
    );

    return checked;
  };

  const handleFilter = (title: IFilterFor) => {
    dispatch(setModalStatus({ active: true, modalFor: "table-filter" }));
    dispatch(setFilterFor(title));
  };

  const handleRemoveFilters = () => {
    setFilteredTickets([]);
    dispatch(setFilterFor(undefined));
    setIsTimeSorted(false);
  };

  useEffect(() => {
    if (filter.filter_item === "") {
      setFilteredTickets([]);
      return;
    }
    const filtered = tickets?.filter((ticket) =>
      (filter.filter_for === "Service"
        ? services_name(ticket.service_id)
        : filter.filter_for === "Window"
        ? windows_name(ticket.window_id)
        : []
      )?.includes(filter.filter_item)
    );

    setFilteredTickets(filtered);

    return () => {
      setFilteredTickets([]);
    };
  }, [filter, services_name, tickets, windows_name]);

  const [is_time_sorted, setIsTimeSorted] = useState(false);

  const handleSortTime = () => {
    const first_to_last = (
      filtered_tickets && filtered_tickets.length > 0
        ? filtered_tickets
        : tickets
    )
      ?.map((ticket) => ticket.created_at)
      .sort((a, b) => {
        setIsTimeSorted(!is_time_sorted);
        if (is_time_sorted) {
          return new Date(a).getTime() - new Date(b).getTime();
        }
        return new Date(b).getTime() - new Date(a).getTime();
      })
      .map((time) => {
        return tickets?.find((ticket) => ticket.created_at === time);
      }) as QueueTicketType[];

    setFilteredTickets(first_to_last);
  };

  const handleRefetchTable = () => {
    refetch();
    RefetchCurrentStatus();
  };

  if (!branch_id) return <div>No branch ID available</div>;
  if (!isTicketSuccess) return <div>Loading tickets...</div>;
  if (isServicesLoading) return <div>Loading services...</div>;
  if (isWindowLoading) return <div>Loading windows...</div>;

  return (
    <div className="md:px-16 max-md:px-2 mb-5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-4">
              Service{" "}
              <FontAwesomeIcon
                icon={faFilter}
                size="1x"
                color="grey"
                className="cursor-pointer"
                onClick={() => handleFilter("Service")}
              />
            </th>
            <th>Queue No </th>
            <th>
              Visit Time{" "}
              <FontAwesomeIcon
                icon={is_time_sorted ? faSortUp : faSortDown}
                size="1x"
                color="grey"
                className="cursor-pointer"
                onClick={handleSortTime}
              />
            </th>
            <th>
              Window{" "}
              <FontAwesomeIcon
                icon={faFilter}
                size="1x"
                color="grey"
                className="cursor-pointer"
                onClick={() => handleFilter("Window")}
              />
            </th>
            <th>Name</th>
            <th className="float-end">
              {(filtered_tickets ?? []).length > 0 && (
                <button
                  className="font-semibold p-1 mr-6 rounded border border-crimson"
                  onClick={handleRemoveFilters}
                >
                  Remove Filters
                </button>
              )}
              {isFetching ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="1x"
                  color="grey"
                  className="float-end animate-spin"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowRotateRight}
                  size="1x"
                  color="grey"
                  onClick={handleRefetchTable}
                  className="cursor-pointer"
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
                  className={` ${
                    item.is_called && !checkIfDone(item.status_id.toString())
                      ? "bg-slate-500 text-white"
                      : ""
                  }`}
                >
                  <td className="text-center">
                    {services_name(item.service_id)}
                  </td>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{FormatTime(item.created_at)}</td>
                  <td className="text-center">
                    {windows_name(item.window_id) ?? "unassigned"}
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="py-3 text-center ">
                    <TableActions ticket={item} />
                  </td>
                </tr>
              ))
            : tickets?.map((item, index) => (
                <tr
                  key={index}
                  className={` ${
                    called_by.some((ticket) => ticket.queue_code === item.code)
                      ? "bg-slate-500 text-white"
                      : called.some(
                          (ticket) => ticket.queue_code === item.code
                        )
                      ? "bg-rose-pink"
                      : ""
                  }`}
                >
                  <td className="text-center">
                    {services_name(item.service_id)}
                  </td>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{FormatTime(item.created_at)}</td>
                  <td className="text-center">
                    {windows_name(item.window_id) ?? "unassigned"}
                  </td>
                  <td className="text-center">{item.name}</td>
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

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useLazyServiceQuery,
  useLazyWindowQuery,
  useQueueQuery,
} from "../../shared/api/queue";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../shared/stores/auth";
import { useState, useEffect, useCallback } from "react";
import {
  QueueServiceType,
  QueueWindowListType,
} from "../../../../shared/types/queue-ticket";
import { FormatTime } from "../../../../utils/time-formatter";

export default function TransactionTable() {
  const id = useSelector((state: IRootState) => state.branch.id);

  const [services, setServices] = useState<QueueServiceType[]>([]);

  const [windows, setWindows] = useState<QueueWindowListType>([]);

  const { data: tickets, isSuccess: isTicketSuccess } = useQueueQuery(id ?? "");

  const [fetchService, { isLoading: isServicesLoading }] =
    useLazyServiceQuery();

  const [fetchWindow, { isLoading: isWindowLoading }] = useLazyWindowQuery();

  useEffect(() => {
    const fetchServices = async () => {
      if (isTicketSuccess && tickets) {
        const service_promises = tickets.map((ticket) =>
          ticket.service_id
            ? fetchService(ticket.service_id).unwrap()
            : Promise.resolve(null)
        );
        const fetched_services = await Promise.all(service_promises);
        setServices(
          fetched_services.filter(
            (service) => service !== null
          ) as QueueServiceType[]
        );
      }
    };

    fetchServices();
  }, [isTicketSuccess, tickets, fetchService]);

  useEffect(() => {
    const fetchWindows = async () => {
      const windows = await fetchWindow().unwrap();
      setWindows(windows);
    };

    fetchWindows();
  }, [fetchWindow]);

  const services_name = useCallback(
    (service_id: string) => {
      return services.find((service) => service.id === service_id)?.name;
    },
    [services]
  );

  const windows_name = useCallback(
    (window_id: string) => {
      return windows.find((window) => window.id === window_id)?.name;
    },
    [windows]
  );

  if (!id) return <div>No branch ID available</div>;
  if (!isTicketSuccess) return <div>Loading tickets...</div>;
  if (isServicesLoading) return <div>Loading services...</div>;
  if (isWindowLoading) return <div>Loading windows...</div>;

  return (
    <div className="px-16">
      <table className=" w-full">
        <thead className="">
          <tr>
            <th className="py-4">
              Service
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
            <th>
              Queue No
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
            <th>
              Visit Time
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
            <th>
              Window
              <FontAwesomeIcon icon={faFilter} size="1x" color="grey" />
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item, index) => (
            <tr key={index} className="border hover:bg-gray-700">
              <td className="text-center">{services_name(item.service_id)}</td>
              <td className="text-center">{item.queue_no}</td>
              <td className="text-center">{FormatTime(item.created_at)}</td>
              <td className="text-center">{windows_name(item.window_id)}</td>
              <td className="py-3 text-center ">
                <button className="bg-blue-ribbon text-white w-20 py-1 rounded mr-3">
                  Call
                </button>
                <button className="bg-crimson text-white w-20 py-1 rounded">
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

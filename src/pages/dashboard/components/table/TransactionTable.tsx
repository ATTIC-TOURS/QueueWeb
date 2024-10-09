import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueueQuery } from "../../shared/api/queue";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../shared/stores/app";
import { FormatTime } from "../../../../utils/time-formatter";
import { useServices } from "../../../../hooks/useServices";
import { useWindows } from "../../../../hooks/useWindows";
import TableActions from "./components/actions/TableActions";

export default function TransactionTable() {
  const id = useSelector((state: IRootState) => state.branch.id);

  const { data: tickets, isSuccess: isTicketSuccess } = useQueueQuery(id ?? "");

  const { isServicesLoading, services_name } = useServices();

  const { isWindowLoading, windows_name } = useWindows();

  if (!id) return <div>No branch ID available</div>;
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
                <TableActions ticket={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

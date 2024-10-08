import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TransactionTable() {
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
          <tr className="border hover:bg-gray-700">
            <td className="text-center">Service 1</td>
            <td className="text-center">1</td>
            <td className="text-center">12:00</td>
            <td className="text-center">1</td>
            <td className="py-3 text-center ">
              <button className="bg-blue-ribbon text-white w-20 py-1 rounded mr-3">
                Call
              </button>
              <button className="bg-crimson text-white w-20 py-1 rounded">
                Update
              </button>
            </td>
          </tr>
          <tr className="border hover:bg-gray-700">
            <td className="text-center">Service 1</td>
            <td className="text-center">1</td>
            <td className="text-center">12:00</td>
            <td className="text-center">1</td>
            <td className="py-3 text-center ">
              <button className="bg-blue-ribbon text-white w-20 py-1 rounded mr-3">
                Call
              </button>
              <button className="bg-crimson text-white w-20 py-1 rounded">
                Update
              </button>
            </td>
          </tr>
          <tr className="border hover:bg-gray-700">
            <td className="text-center">Service 1</td>
            <td className="text-center">1</td>
            <td className="text-center">12:00</td>
            <td className="text-center">1</td>
            <td className="py-3 text-center ">
              <button className="bg-blue-ribbon text-white w-20 py-1 rounded mr-3">
                Call
              </button>
              <button className="bg-crimson text-white w-20 py-1 rounded">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

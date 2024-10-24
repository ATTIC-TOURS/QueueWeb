import { useDispatch, useSelector } from "react-redux";
import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";
import {
  AppDispatch,
  IRootState,
} from "../../../../../../../shared/stores/app";
import { useServicesQuery } from "../../../../../shared/api/queue";
import { setFilterItem} from "../../../../../../../shared/stores/table-filter";
import { useMemo, useState } from "react";
import { setModalStatus } from "../../../../../../../shared/stores/modal";
import { useWindows } from "../../../../../../../hooks/useWindows";

export default function TableFilter() {
  const { handleModalClick, close_modal } = useModalWrapper("table-filter");

  const { data: services } = useServicesQuery();

  const { windows } = useWindows();

  const filter_for = useSelector(
    (state: IRootState) => state.service_filter.filter_for
  );

  const dispatch = useDispatch<AppDispatch>();

  const [selected_item, setSelectedItem] = useState("");

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
  };

  const handleFilterService = () => {
    dispatch(setFilterItem(selected_item));
    dispatch(setModalStatus({ active: false, modalFor: "table-filter" }));
  };


  const data = useMemo(() => {
    if (filter_for === "Service") {
      return services;
    } else if (filter_for === "Window") {
      return windows;
    }
  }, [filter_for, services, windows]);

  return (
    <div
      onClick={handleModalClick}
      className={`bg-white-wash shadow rounded w-auto p-3 my-6 mx-auto max-w-3xl ${
        close_modal ? "close-modal-animation" : "modal-animation"
      }`}
    >
      <div className="p-5 flex gap-3 items-center">
        <div className="flex flex-col">
          <label className="mb-1">Select {filter_for}</label>
          <select
            className="bg-white-wash p-2"
            value={selected_item}
            onChange={handleSelectItem}
          >
            <option value="">{filter_for}</option>
            {data?.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blood-red text-white-wash rounded py-2 px-6 mt-7 h-fit"
          onClick={handleFilterService}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

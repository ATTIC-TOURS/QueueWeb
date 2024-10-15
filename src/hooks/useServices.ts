import { useSelector } from "react-redux";
import {
  useLazyServiceQuery,
  useQueueQuery,
} from "../pages/dashboard/shared/api/queue";
import { IRootState } from "../shared/stores/app";
import { useEffect, useCallback, useState } from "react";
import { QueueServiceType } from "../shared/types/queue-ticket";

export function useServices() {
  const id = useSelector((state: IRootState) => state.branch.id);

  const [services, setServices] = useState<QueueServiceType[]>([]);

  const { data: tickets, isSuccess: isTicketSuccess } = useQueueQuery(id ?? "");

  const [fetchService, { isLoading: isServicesLoading }] =
    useLazyServiceQuery();

  useEffect(() => {
    (async () => {
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
    })();
  }, [isTicketSuccess, tickets, fetchService]);

  const services_name = useCallback(
    (service_id: string) => {
      return services.find((service) => service.id === service_id)?.name;
    },
    [services]
  );

  return { services_name, isServicesLoading };
}

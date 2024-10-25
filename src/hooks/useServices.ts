import { useLazyServiceQuery } from "../pages/dashboard/shared/api/queue";
import { useEffect, useCallback, useState } from "react";
import { QueueServiceType } from "../shared/types/queue-ticket";
import { useQueueTickets } from "./useQueueTickets";

export function useServices() {
  const [services, setServices] = useState<QueueServiceType[]>([]);

  const { tickets } = useQueueTickets();
  const [fetchService, { isLoading: isServicesLoading }] =
    useLazyServiceQuery();

  useEffect(() => {
    (async () => {
      if (tickets) {
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
  }, [tickets, fetchService]);

  const services_name = useCallback(
    (service_id: string) => {
      return services.find((service) => service.id === service_id)?.name;
    },
    [services]
  );

  return { services_name, isServicesLoading };
}

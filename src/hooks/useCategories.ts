import { useLazyCategoryQuery } from "../pages/dashboard/shared/api/queue";
import { useEffect, useCallback, useState } from "react";
import { QueueCategoryType } from "../shared/types/queue-ticket";
import { useQueueTickets } from "./useQueueTickets";

export function useCategories() {
  const [categories, setCategories] = useState<QueueCategoryType[]>([]);

  const { tickets } = useQueueTickets();
  const [fetchCategories, { isLoading: isCategoriesLoading }] =
    useLazyCategoryQuery();

  useEffect(() => {
    (async () => {
      if (tickets) {
        const categories_promises = tickets.map((ticket) =>
          ticket.category_id
            ? fetchCategories(ticket.category_id).unwrap()
            : Promise.resolve(null)
        );
        const fetched_categories = await Promise.all(categories_promises);

        setCategories(
          fetched_categories.filter(
            (category) => category !== null
          ) as QueueCategoryType[]
        );
      }
    })();
  }, [tickets, fetchCategories]);

  const categories_name = useCallback(
    (category_id: string) => {
      return categories.find((category) => category.id === category_id)?.name;
    },
    [categories]
  );

  return { categories_name, isCategoriesLoading };
}

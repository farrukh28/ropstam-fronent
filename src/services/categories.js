import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = (page, limit, sort, q) => {
  return axios.get(`/categories`, {
    params: {
      page,
      limit,
      sort,
      q,
    },
  });
};

export const useCategoriesData = (page = 0, limit = 10, sort = "", q = "") => {
  page++;

  return useQuery({
    queryKey: ["get-all-categories", page, limit, sort, q],
    queryFn: () => fetchCategories(page, limit, sort, q),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

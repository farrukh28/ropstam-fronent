import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const fetchCars = (page, limit, sort, q) => {
  return axios.get(`/cars`, {
    params: {
      page,
      limit,
      sort,
      q,
    },
  });
};

export const useCarsData = (page = 0, limit = 10, sort = "", q = "") => {
  page++;
  return useQuery({
    queryKey: ["get-all-cars", page, limit, sort, q],
    queryFn: () => fetchCars(page, limit, sort, q),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

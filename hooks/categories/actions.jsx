import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../general/useAxiosAuth";
import { getCategories, getCategoryDetail } from "@/services/categories";

export function useFetchCategories() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(axios),
  });
}

export function useFetchCategory(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryDetail(slug, axios),
    enabled: !!slug,
  });
}

"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../general/useAxiosAuth";
import { getWarehouseDetail, getWarehouses } from "@/services/warehouses";

export function useFetchWarehouses() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["warehouses"],
    queryFn: () => getWarehouses(axios),
  });
}

export function useFetchWarehouse(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["warehouse", slug],
    queryFn: () => getWarehouseDetail(slug, axios),
    enabled: !!slug,
  });
}

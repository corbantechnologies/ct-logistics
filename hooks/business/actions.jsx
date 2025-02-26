"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../general/useAxiosAuth";
import { getBusinessDetail, getBusinesses } from "@/services/business";

export function useFetchBusinesses() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["businesses"],
    queryFn: () => getBusinesses(axios),
  });
}

export function useFetchBusiness(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["business", slug],
    queryFn: () => getBusinessDetail(slug, axios),
    enabled: !!slug,
  });
}

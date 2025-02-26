"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../general/useAxiosAuth";
import { getProductDetail, getProducts } from "@/services/products";

export function useFetchProducts() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(axios),
  });
}

export function useFetchProduct(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductDetail(slug, axios),
    enabled: !!slug,
  });
}

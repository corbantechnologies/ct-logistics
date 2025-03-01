"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../general/useAxiosAuth";
import {
  getProductDetail,
  getProducts,
  getPublicProductDetail,
} from "@/services/products";

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

export function useFetcPublicProduct(reference) {
  return useQuery({
    queryKey: ["product", reference],
    queryFn: () => getPublicProductDetail(reference),
    enabled: !!reference,
  });
}

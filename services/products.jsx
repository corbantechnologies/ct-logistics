"use client";
import { apiMultipartActions } from "@/tools/api";

export const getProducts = async (axios) => {
  const response = await apiMultipartActions?.get("/api/products/", axios);
  return response?.data || [];
};

export const getProductDetail = async (slug, axios) => {
  const response = await apiMultipartActions?.get(
    `/api/products/${slug}/`,
    axios
  );
  return response?.data || {};
};

export const createProduct = async (values, axios) => {
  await apiMultipartActions?.post("/api/products/", values, axios);
};

export const updateProduct = async (slug, values, axios) => {
  await apiMultipartActions?.patch(`/api/products/${slug}/`, values, axios);
};

export const deleteProduct = async (slug, axios) => {
  await apiMultipartActions?.delete(`/api/products/${slug}/`, axios);
};

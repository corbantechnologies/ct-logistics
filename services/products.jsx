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

export const createProduct = async (formData, axios) => {
  await apiMultipartActions?.post("/api/products/", formData, axios);
};

export const updateProduct = async (slug, formData, axios) => {
  await apiMultipartActions?.patch(`/api/products/${slug}/`, formData, axios);
};

export const deleteProduct = async (slug, axios) => {
  await apiMultipartActions?.delete(`/api/products/${slug}/`, axios);
};

export const getPublicProductDetail = async (reference) => {
  const response = await apiMultipartActions?.get(
    `/api/products/qrcode/${reference}/`
  );
  return response?.data || {};
};

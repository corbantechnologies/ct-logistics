"use client";
import { apiActions } from "@/tools/api";

export const createCategory = async (values, axios) => {
  await apiActions?.post("/api/categories/", values, axios);
};

export const updateCategory = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/categories/${slug}/`, formData, axios);
};

export const getCategories = async (axios) => {
  const response = await apiActions?.get("/api/categories/", axios);
  return response?.data || [];
};

export const getCategoryDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/categories/${slug}/`, axios);
  return response?.data || {};
};

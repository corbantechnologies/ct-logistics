"use client";
import { apiActions } from "@/tools/api";

export const createWarehouse = async (values, axios) => {
  await apiActions?.post("/api/warehouses/", values, axios);
};

export const getWarehouses = async (axios) => {
  const response = await apiActions?.get("/api/warehouses/", axios);
  return response?.data || [];
};

export const getWarehouseDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/warehouses/${slug}/`, axios);
  return response?.data || {};
};

export const updateWarehouse = async (slug, values, axios) => {
  await apiActions?.patch(`/api/warehouses/${slug}/`, values, axios);
};

export const deleteWarehouse = async (slug, axios) => {
  await apiActions?.delete(`/api/warehouses/${slug}/`, axios);
};

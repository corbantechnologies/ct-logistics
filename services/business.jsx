"use client";
import { apiActions } from "@/tools/api";

export const createBusiness = async (values, axios) => {
  await apiActions?.post("/api/business/", values, axios);
};

export const getBusinesses = async (axios) => {
  const response = await apiActions?.get("/api/business/", axios);
  return response?.data || [];
};

export const getBusinessDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/business/${slug}/`, axios);
  return response?.data || {};
};

export const updateBusiness = async (slug, values, axios) => {
  await apiActions?.patch(`/api/business/${slug}/`, values, axios);
};

export const deleteBusiness = async (slug, axios) => {
  await apiActions?.delete(`/api/business/${slug}/`, axios);
};

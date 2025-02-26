"use client";
import { apiActions } from "@/tools/api";

export const verifyAccount = async (values) => {
  await apiActions?.post("/api/accounts/verify-account/", values);
};

export const forgotPasswordRequest = async (values) => {
  await apiActions?.post("/api/accounts/password/reset/", values);
};

export const resetPassword = async (values) => {
  await apiActions?.post("/api/accounts/password/new/", values);
};

export const getUser = async (userId, axios) => {
  const response = await apiActions?.get(`/api/accounts/${userId}/`, axios);
  return response?.data || {};
};

export const updateProfile = async (userId, formData, axios) => {
  await apiActions?.patch(`/api/accounts/${userId}/`, formData, axios);
};

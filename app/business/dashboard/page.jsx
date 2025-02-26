"use client";
import { useFetchProfile } from "@/hooks/accounts/actions";
import React from "react";

function Dashboard() {
  const {
    isLoading: isLoadingProfile,
    data: profile,
    refetch: refetchProfile,
  } = useFetchProfile();

  console.log(profile);

  return <div>Dashboard</div>;
}

export default Dashboard;

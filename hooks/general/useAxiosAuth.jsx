"use client";

import { useSession } from "next-auth/react";

function useAxiosAuth() {
  const { data: session } = useSession();

  const tokens = session?.user?.access;

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer" + " " + tokens,
      "Content-Type": "multipart/form-data",
    },
  };

  return authenticationHeader;
}

export default useAxiosAuth;

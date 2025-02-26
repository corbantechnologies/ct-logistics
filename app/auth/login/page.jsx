"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    const session = await getSession();

    if (response?.error === "CredentialsSignin") {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      if (session?.user?.is_business === true) {
        router?.push("/business/dashboard");
      }
      //  TODO: Add for employees
    }
    setLoading(false);
  };

  return <div>Login</div>;
}

export default Login;

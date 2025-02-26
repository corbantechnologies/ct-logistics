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
      redirect: false, // Prevent auto redirect
    });

    if (!response?.ok) {
      toast.error(response?.error || "Login failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Login successful");

    const session = await getSession();

    if (session?.user?.is_business) {
      router.push("/business/dashboard");
    } else {
      router.push("/employee/dashboard"); // TODO: Change this for employees
    }

    setLoading(false);
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

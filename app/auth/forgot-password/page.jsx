"use client";
import { forgotPasswordRequest } from "@/services/accounts";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3 fw-bold">Forgot Password</h3>
        <p className="text-center text-muted mb-4">
          Enter your email to receive a password reset link.
        </p>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await forgotPasswordRequest(values);
              toast.success("Email sent successfully");
              router.push("/auth/password-reset");
            } catch (error) {
              if (error?.response?.data?.email?.[0]) {
                toast.error("Account with this email does not exist!");
              } else {
                toast.error("Failed to send email");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form>
              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="example@domain.com"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              {/* Back to Login */}
              <div className="text-center mt-3">
                <p className="mb-0">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;

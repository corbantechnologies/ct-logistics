"use client";
import { resetPassword } from "@/services/accounts";
import { ResetPassword } from "@/validation";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3 fw-bold">Reset Your Password</h3>
        <p className="text-center text-muted mb-4">
          A code has been sent to your email to reset your password.
        </p>

        <Formik
          initialValues={{
            code: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ResetPassword}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await resetPassword(values);
              toast.success("Password reset successfully");
              router.push("/auth/login");
            } catch (error) {
              if (error?.response?.data?.non_field_errors?.[0]) {
                toast.error("Invalid or expired verification code!");
              } else {
                toast.error("Password reset failed");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form>
              {/* Reset Code */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Reset Code</label>
                <Field
                  name="code"
                  type="text"
                  className="form-control"
                  placeholder="Enter reset code"
                  required
                />
                <ErrorMessage
                  name="code"
                  component="p"
                  className="text-danger mt-1"
                />
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  required
                />
                <ErrorMessage
                  name="confirmPassword"
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
                {loading ? "Resetting Password..." : "Reset Password"}
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

export default PasswordReset;

"use client";
import { verifyAccount } from "@/services/accounts";
import { CodeSchema } from "@/validation";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function VerifyAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3 fw-bold">Verify Your Account</h3>
        <p className="text-center text-muted mb-4 small">
          A verification code has been sent to your email. If you don’t see it,
          check your spam folder.
        </p>

        <Formik
          initialValues={{ code: "" }}
          validationSchema={CodeSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await verifyAccount(values);
              toast.success("Account verified successfully");
              router.push("/auth/login");
            } catch (error) {
              if (error?.response?.data?.non_field_errors?.[0]) {
                toast.error("Invalid or expired verification code!");
              } else {
                toast.error("Verification failed");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form>
              {/* Verification Code Field */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Verification Code
                </label>
                <Field
                  name="code"
                  type="text"
                  className="form-control"
                  placeholder="Enter the verification code"
                  required
                />
                <ErrorMessage
                  name="code"
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
                {loading ? "Verifying..." : "Verify Account"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default VerifyAccount;

"use client";
import { signUpBusiness } from "@/tools/api";
import { RegistrationSchema } from "@/validation";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function BusinessOwnerSignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm border-0"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h3 className="text-center mb-3 fw-bold">Sign Up</h3>
        <p className="text-center text-muted small">
          Create an account to manage your business.
        </p>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await signUpBusiness(values);
              toast.success("Account created successfully");
              router.push("/auth/login");
            } catch (error) {
              if (
                error?.response?.data?.email?.[0] ||
                error?.response?.data?.username?.[0]
              ) {
                toast.error("User already exists");
              } else {
                toast.error("Registration Failed");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {() => (
            <Form>
              <div className="row">
                {/* First Name */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">First Name</label>
                  <Field
                    name="first_name"
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">Last Name</label>
                  <Field
                    name="last_name"
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Email */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="example@domain.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Phone */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <Field
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="+1234567890"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Password */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3 col-md-6 col-12">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-danger mt-1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-3">
          <p className="small">
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary text-decoration-none">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BusinessOwnerSignUp;

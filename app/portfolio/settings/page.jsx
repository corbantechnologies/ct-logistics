"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetchProfile } from "@/hooks/accounts/actions";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import useUserId from "@/hooks/general/useUserId";
import { updateProfile } from "@/services/accounts";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AccountSettings() {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();
  const userId = useUserId();
  const {
    isLoading: isLoadingProfile,
    data: profile,
    refetch: refetchProfile,
  } = useFetchProfile();

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-4">
      <h2>Account Settings</h2>
      <p className="text-muted">Update your profile details below.</p>

      <div className="card p-4 shadow-sm">
        <Formik
          initialValues={{
            first_name: profile?.first_name || "",
            last_name: profile?.last_name || "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const formData = new FormData();
              formData.append("first_name", values.first_name);
              formData.append("last_name", values.last_name);

              await updateProfile(userId, formData, axios);
              refetchProfile();
              setLoading(false);
              toast.success("Profile updated successfully");
            } catch (error) {
              toast.error("Failed to update profile");
              setLoading(false);
            }
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              {/* First Name */}
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <Field
                  type="text"
                  name="first_name"
                  className="form-control"
                  onChange={handleChange}
                  value={values.first_name}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <Field
                  type="text"
                  name="last_name"
                  className="form-control"
                  onChange={handleChange}
                  value={values.last_name}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AccountSettings;

"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetchBusiness } from "@/hooks/business/actions";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import { updateBusiness } from "@/services/business";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

function BusinessDetailSettings() {
  const params = useParams();
  const slug = params?.slug;
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);

  const {
    isLoading: isLoadingBusiness,
    data: business,
    refetch: refetchBusiness,
  } = useFetchBusiness(slug);

  if (isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-4">
      <h2>Business Settings</h2>
      <p className="text-muted">Update your business details below.</p>

      <div className="card p-4 shadow-sm">
        <Formik
          initialValues={{
            name: business?.name || "",
            contact: business?.contact || "",
            location: business?.location || "",
            currency: business?.currency || "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("contact", values.contact);
              formData.append("location", values.location);
              formData.append("currency", values.currency);

              await updateBusiness(slug, formData, axios);
              refetchBusiness();
              setLoading(false);
              toast.success("Business updated successfully");
            } catch (error) {
              toast.error("Failed to update business");
              setLoading(false);
            }
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              {/* Business Name */}
              <div className="mb-3">
                <label className="form-label">Business Name</label>
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  value={values.name}
                  required
                />
              </div>

              {/* Contact */}
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <Field
                  type="text"
                  name="contact"
                  className="form-control"
                  onChange={handleChange}
                  value={values.contact}
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">Location</label>
                <Field
                  type="text"
                  name="location"
                  className="form-control"
                  onChange={handleChange}
                  value={values.location}
                />
              </div>

              {/* Currency */}
              <div className="mb-3">
                <label className="form-label">Currency</label>
                <Field as="select" name="currency" className="form-select">
                  <option value={business?.currency}>
                    {business?.currency || "Select Currency"}
                  </option>
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="CNY">CNY</option>
                  <option value="INR">INR</option>
                  <option value="RUB">RUB</option>
                  <option value="BRL">BRL</option>
                  <option value="IDR">IDR</option>
                  <option value="MYR">MYR</option>
                  <option value="PHP">PHP</option>
                  <option value="SGD">SGD</option>
                  <option value="THB">THB</option>
                  <option value="VND">VND</option>
                  <option value="ZAR">ZAR</option>
                </Field>
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

export default BusinessDetailSettings;

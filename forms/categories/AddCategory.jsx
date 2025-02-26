"use client";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import { createCategory } from "@/services/categories";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddCategory({ refetch, closeModal, business }) {
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          business: business?.reference,
          name: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);

          try {
            await createCategory(values, axios);
            refetch(); // Refresh categories
            closeModal(); // Close modal
            toast.success("Category created successfully");
          } catch (error) {
            toast.error("Failed to create category");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Category Name */}
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <Field
                name="name"
                className="form-control"
                placeholder="Enter category name"
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || isSubmitting}
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddCategory;

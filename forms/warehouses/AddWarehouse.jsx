"use client";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { createWarehouse } from "@/services/warehouses";
import * as Yup from "yup";

function AddWarehouse({ refetch, closeModal, business }) {
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Warehouse name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().matches(/^\+?\d{10,15}$/, "Invalid phone number"),
    email: Yup.string().email("Invalid email format"),
    contact_person: Yup.string().required("Contact person is required"),
    contact_person_phone: Yup.string().matches(
      /^\+?\d{10,15}$/,
      "Invalid phone number"
    ),
    contact_person_email: Yup.string().email("Invalid email format"),
  });

  return (
    <Formik
      initialValues={{
        business: business?.reference,
        name: "",
        address: "",
        phone: "",
        email: "",
        contact_person: "",
        contact_person_phone: "",
        contact_person_email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          await createWarehouse(values, axios);
          refetch();
          closeModal();
          toast.success("Warehouse created successfully");
        } catch (error) {
          toast.error("Failed to create warehouse");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label className="form-label">Warehouse Name</label>
            <Field
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter warehouse name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <Field
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter warehouse address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <Field
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter warehouse phone number"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter warehouse email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger small"
            />
          </div>

          <hr />

          <h6 className="mb-3">Contact Person Details</h6>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <Field
              type="text"
              name="contact_person"
              className="form-control"
              placeholder="Enter contact person name"
            />
            <ErrorMessage
              name="contact_person"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <Field
              type="text"
              name="contact_person_phone"
              className="form-control"
              placeholder="Enter contact person's phone"
            />
            <ErrorMessage
              name="contact_person_phone"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field
              type="email"
              name="contact_person_email"
              className="form-control"
              placeholder="Enter contact person's email"
            />
            <ErrorMessage
              name="contact_person_email"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Warehouse"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddWarehouse;

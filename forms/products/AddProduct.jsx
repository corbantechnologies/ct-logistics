"use client";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { createProduct } from "@/services/products";
import * as Yup from "yup";

function AddProduct({ refetch, closeModal, business, categories, warehouses }) {
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);

  // Validation Schema
  const ProductSchema = Yup.object().shape({
    // category: Yup.string().required("Category is required"),
    // warehouse: Yup.string().required("Warehouse is required"),
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Must be a positive number"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Must be a whole number"),
    discount: Yup.number().min(0, "Discount cannot be negative"),
  });

  return (
    <Formik
      initialValues={{
        business: business?.reference,
        image: null,
        category: "",
        warehouse: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        discount: "",
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const formData = new FormData();
          if (values?.image) {
            formData.append("image", values?.image);
          }
          formData.append("business", values?.business);
          formData.append("category", values?.category);
          formData.append("warehouse", values?.warehouse);
          formData.append("name", values?.name);
          formData.append("description", values?.description);
          formData.append("price", values?.price);
          formData.append("stock", values?.stock);
          formData.append("discount", values?.discount);

          await createProduct(formData, axios);
          refetch();
          closeModal();
          toast.success("Product created successfully");
        } catch (error) {
          toast.error("Failed to create product");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="row">
            {/* Product Image */}
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor="image" className="form-label fw-semibold">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </div>
            {/* Product Name */}
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor="name" className="form-label fw-semibold">
                Product Name
              </label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter product name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger small"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              rows="3"
              placeholder="Enter product description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger small"
            />
          </div>

          <div className="row">
            {/* Price */}
            <div className="mb-3 col-md-4 col-sm-12">
              <label htmlFor="price" className="form-label fw-semibold">
                Price
              </label>
              <Field
                type="number"
                name="price"
                className="form-control"
                placeholder="Enter price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Stock */}
            <div className="mb-3 col-md-4 col-sm-12">
              <label htmlFor="stock" className="form-label fw-semibold">
                Stock Quantity
              </label>
              <Field
                type="number"
                name="stock"
                className="form-control"
                placeholder="Enter stock quantity"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Discount */}
            <div className="mb-3 col-md-4 col-sm-12">
              <label htmlFor="discount" className="form-label fw-semibold">
                Discount (%)
              </label>
              <Field
                type="number"
                name="discount"
                className="form-control"
                placeholder="Enter discount percentage"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-danger small"
              />
            </div>
          </div>

          <div className="row">
            {/* Category Selection */}
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor="category" className="form-label fw-semibold">
                Category
              </label>
              <Field as="select" name="category" className="form-select">
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category?.reference} value={category?.reference}>
                    {category?.name}
                  </option>
                ))}
              </Field>
            </div>

            {/* Warehouse Selection */}
            <div className="mb-3 col-md-6 col-sm-12">
              <label htmlFor="warehouse" className="form-label fw-semibold">
                Warehouse
              </label>
              <Field as="select" name="warehouse" className="form-select">
                <option value="">Select a warehouse</option>
                {warehouses?.map((warehouse) => (
                  <option
                    key={warehouse?.reference}
                    value={warehouse?.reference}
                  >
                    {warehouse?.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || loading}
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddProduct;

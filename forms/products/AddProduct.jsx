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
    category: Yup.string().required("Category is required"),
    warehouse: Yup.string().required("Warehouse is required"),
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
          await createProduct(values, axios);
          refetch();
          closeModal();
          toast.success("Product created successfully");
        } catch (error) {
          console.log(error);
          toast.error("Failed to create product");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Category Selection */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
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
            <ErrorMessage
              name="category"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Warehouse Selection */}
          <div className="mb-3">
            <label htmlFor="warehouse" className="form-label">
              Warehouse
            </label>
            <Field as="select" name="warehouse" className="form-select">
              <option value="">Select a warehouse</option>
              {warehouses?.map((warehouse) => (
                <option key={warehouse?.reference} value={warehouse?.reference}>
                  {warehouse?.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="warehouse"
              component="div"
              className="text-danger small"
            />
          </div>

          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
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

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
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

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">
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

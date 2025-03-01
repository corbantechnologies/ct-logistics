"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetchBusiness } from "@/hooks/business/actions";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import { useFetchProduct } from "@/hooks/products/actions";
import { updateProduct } from "@/services/products";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

function ProductEditPage() {
  const params = useParams();
  const slug = params?.slug;
  const prodSlug = params?.prodSlug;
  const axios = useAxiosAuth();
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const {
    isLoading: isLoadingProduct,
    data: product,
    refetch: refetchProduct,
  } = useFetchProduct(prodSlug);
  const { isLoading: isLoadingBusiness, data: business } =
    useFetchBusiness(slug);

  if (isLoadingProduct || isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div className="text-danger">Product not found.</div>;
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().nullable(),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100"),
    category: Yup.string().required("Category is required"),
    warehouse: Yup.string().required("Warehouse is required"),
  });

  return (
    <div className="container mt-4 mb-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href={`/business/${slug}`}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/business/${slug}/products/${prodSlug}`}>
              Product Details
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit {product?.sku}
          </li>
        </ol>
      </nav>

      <h3 className="fw-bold">Edit Product</h3>

      <Formik
        initialValues={{
          business: business?.reference,
          image: null,
          category: product?.category || "",
          warehouse: product?.warehouse || "",
          name: product?.name || "",
          description: product?.description || "",
          price: product?.price || "",
          stock: product?.stock || "",
          discount: product?.discount || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setUpdating(true);
          try {
            const formData = new FormData();
            if (values?.image) {
              formData.append("image", values.image);
            }
            formData.append("business", values.business);
            formData.append("category", values.category);
            formData.append("warehouse", values.warehouse);
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("stock", values.stock);
            formData.append("discount", values.discount);

            await updateProduct(prodSlug, formData, axios);
            refetchProduct();
            toast.success("Product updated successfully");
            router.push(`/business/${slug}/products/${prodSlug}`);
          } catch (error) {
            toast.error("Failed to update product");
          } finally {
            setUpdating(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="card p-3 shadow-sm">
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <Field
                name="description"
                as="textarea"
                className="form-control"
              />
            </div>

            {/* Price & Stock */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Stock</label>
                <Field name="stock" type="number" className="form-control" />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* Discount */}
            <div className="mb-3">
              <label className="form-label">Discount (%)</label>
              <Field name="discount" type="number" className="form-control" />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Category & Warehouse */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <Field as="select" name="category" className="form-select">
                  <option value={product?.category}>
                    {product?.category_detail?.name || "Select category"}
                  </option>
                  {business?.categories?.map((category) => (
                    <option
                      key={category?.reference}
                      value={category?.reference}
                    >
                      {category?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Warehouse</label>
                <Field as="select" name="warehouse" className="form-select">
                  <option value={product?.warehouse}>
                    {product?.warehouse_detail?.name || "Select warehouse"}
                  </option>
                  {business?.warehouses?.map((warehouse) => (
                    <option
                      key={warehouse?.reference}
                      value={warehouse?.reference}
                    >
                      {warehouse?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="warehouse"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
              />
              {values.image ? (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="Preview"
                    className="img-thumbnail"
                    width={100}
                  />
                </div>
              ) : (
                product?.image && (
                  <img
                    src={product?.image}
                    alt="Existing Product"
                    className="img-thumbnail mt-2"
                    width={100}
                  />
                )
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductEditPage;

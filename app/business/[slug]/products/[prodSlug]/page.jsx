"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import useAxiosAuth from "@/hooks/general/useAxiosAuth";
import { useFetchProduct } from "@/hooks/products/actions";
import { deleteProduct } from "@/services/products";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;
  const prodSlug = params?.prodSlug;

  const [deleting, setDeleting] = useState(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    isLoading: isLoadingProduct,
    data: product,
    refetch: refetchProduct,
  } = useFetchProduct(prodSlug);

  const handleDeleteProduct = async (prodSlug) => {
    setDeleting(true);
    try {
      await deleteProduct(prodSlug, axios);
      toast?.success("Product deleted successfully");
      router?.push(`/business/${slug}/products`);
    } catch (error) {
      toast?.error("Error deleting product");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingProduct) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div className="text-danger">Product not found.</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href={`/business/${slug}`}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product?.sku}
          </li>
        </ol>
      </nav>

      {/* Product Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">{product?.name}</h3>
      </div>

      {/* Product Details */}
      <div className="card p-3 shadow-sm">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-4">
            {product?.image ? (
              <img
                src={product?.image}
                alt={product?.name}
                className="img-fluid rounded"
              />
            ) : (
              <div className="text-muted">No image available</div>
            )}
          </div>

          {/* Product Info */}
          <div className="col-md-8">
            <p>
              <strong>Description:</strong>{" "}
              {product.description || "No description"}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Discount:</strong> {product.discount}%
            </p>

            {/* Warehouse Details */}
            {product.warehouse_detail ? (
              <p>
                <strong>Warehouse:</strong> {product.warehouse_detail.name} (
                {product.warehouse_detail.address})
              </p>
            ) : (
              <p className="text-muted">No warehouse assigned</p>
            )}

            {/* Category Details */}
            {product.category_detail ? (
              <p>
                <strong>Category:</strong> {product.category_detail.name}
              </p>
            ) : (
              <p className="text-muted">No category assigned</p>
            )}

            {/* Barcode & QR Code */}
            <div className="d-flex mt-3">
              {product.barcode && (
                <div className="me-3">
                  <p>
                    <strong>Barcode:</strong>
                  </p>
                  <img
                    src={product?.barcode}
                    alt="Barcode"
                    className="img-fluid"
                    width={200}
                    height={50}
                  />
                </div>
              )}
              {product.qrcode && (
                <div>
                  <p>
                    <strong>QR Code:</strong>
                  </p>
                  <img
                    width={100}
                    height={100}
                    src={product?.qrcode}
                    alt="QR Code"
                    className="img-fluid"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <Link href={`/business/${slug}/products/${product?.slug}/edit`}>
          <button className="btn btn-primary me-2">Edit Product</button>
        </Link>
        <button
          onClick={() => handleDeleteProduct(product?.slug)}
          className="btn btn-danger"
        >
          {deleting ? "Deleting ..." : "Delete Product"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;

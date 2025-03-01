"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetcPublicProduct } from "@/hooks/products/actions";
import { useParams } from "next/navigation";
import React from "react";

function ProductPublicDetail() {
  const params = useParams();
  const productReference = params?.productReference;

  const { isLoading: isLoadingProduct, data: product } =
    useFetcPublicProduct(productReference);

  if (isLoadingProduct) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-danger">Product Not Found</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-5">
            <img
              src={product?.image || "/submain.png"}
              alt={product?.name}
              className="img-fluid rounded-start"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="fw-bold">{product?.name}</h2>
              <p className="text-muted">SKU: {product?.sku}</p>
              <p className="lead">
                {product?.description || "No description available"}
              </p>

              <h4 className="text-primary fw-bold">Price: {product?.price}</h4>
              <p
                className={product?.stock > 0 ? "text-success" : "text-danger"}
              >
                {product?.stock > 0
                  ? `In Stock: ${product?.stock}`
                  : "Out of Stock"}
              </p>

              {/* Category and Warehouse */}
              <div className="mb-3">
                <span className="badge bg-secondary me-2">
                  Category: {product?.category_detail?.name || "N/A"}
                </span>
                <span className="badge bg-dark">
                  Warehouse: {product?.warehouse_detail?.name || "N/A"}
                </span>
              </div>

              {/* QR Code Placeholder (If available) */}
              {product?.qrcode && (
                <div className="mt-4">
                  <h6>Scan QR Code</h6>
                  <img
                    src={product?.qrcode}
                    alt="QR Code"
                    className="img-fluid"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPublicDetail;

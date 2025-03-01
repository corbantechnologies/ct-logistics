"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import AddProduct from "@/forms/products/AddProduct";
import { useFetchBusiness } from "@/hooks/business/actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function BusinessProducts() {
  const params = useParams();
  const slug = params?.slug;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const {
    isLoading: isLoadingBusiness,
    data: business,
    refetch: refetchBusiness,
  } = useFetchBusiness(slug);

  if (isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-4 mb-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Products</h3>
        <button
          onClick={handleShow}
          className="btn btn-primary btn-sm shadow-sm"
        >
          <i className="bi bi-plus-lg"></i> Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog modal-dialog-scrollable modal-dialog-centered"
      >
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Add Product</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <AddProduct
            refetch={refetchBusiness}
            business={business}
            closeModal={handleClose}
            warehouses={business?.warehouses}
            categories={business?.categories}
          />
        </div>
      </Modal>

      {/* Product List Table */}
      <div className="card shadow-sm">
        {business?.products?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Warehouse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {business.products.map((product, index) => (
                  <tr key={product?.reference}>
                    <td>{index + 1}</td>
                    <td>{product?.name}</td>
                    <td>{product?.category_detail?.name || "N/A"}</td>
                    <td>{product?.price}</td>
                    <td>{product?.stock}</td>
                    <td>{product?.warehouse_detail?.name || "N/A"}</td>
                    <td>
                      <Link
                        href={`/business/${slug}/products/${product?.slug}`}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-body">
            <div className="alert alert-info text-center" role="alert">
              No products found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessProducts;

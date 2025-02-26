"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import AddCategory from "@/forms/categories/AddCategory";
import { useFetchBusiness } from "@/hooks/business/actions";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function BusinessCategories() {
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
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Categories</h3>
        <button
          onClick={handleShow}
          className="btn btn-primary btn-sm shadow-sm"
        >
          <i className="bi bi-plus-lg"></i> Add Category
        </button>
      </div>

      {/* Modal for Adding Category */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Add Category</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <AddCategory
            refetch={refetchBusiness}
            business={business}
            closeModal={handleClose}
          />
        </div>
      </Modal>

      {/* Categories Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-white text-primary">
          <h5 className="mb-0">Categories List</h5>
        </div>

        {business?.categories && business?.categories.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {business.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-body">
            <div className="alert alert-info text-center" role="alert">
              No categories found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessCategories;

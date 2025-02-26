"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import AddCategory from "@/forms/categories/AddCategory";
import AddWarehouse from "@/forms/warehouses/AddWarehouse";
import { useFetchBusiness } from "@/hooks/business/actions";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function BusinessWarehouses() {
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
        <h3 className="fw-bold">Warehouses</h3>
        <button
          onClick={handleShow}
          className="btn btn-primary btn-sm shadow-sm"
        >
          <i className="bi bi-plus-lg"></i> Add Warehouse
        </button>
      </div>

      {/* modal of adding warehouses */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog modal-dialog-scrollable"
      >
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Add Warehouse</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <AddWarehouse
            refetch={refetchBusiness}
            business={business}
            closeModal={handleClose}
          />
        </div>
      </Modal>

      {/* Warehouse Table */}
    </div>
  );
}

export default BusinessWarehouses;

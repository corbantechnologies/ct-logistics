"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
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
    <div className="container mt-4 mb-4">
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

      {/* Modal for adding warehouses */}
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
      <div className="card shadow-sm mb-3">
        {business?.warehouses && business?.warehouses.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Contact Person</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {business?.warehouses.map((warehouse, index) => (
                  <tr key={warehouse.reference}>
                    <td>{index + 1}</td>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.address}</td>
                    <td>{warehouse.phone || "N/A"}</td>
                    <td>{warehouse.email || "N/A"}</td>
                    <td>
                      <strong>{warehouse.contact_person}</strong>
                      <br />
                      <small>{warehouse.contact_person_phone || "N/A"}</small>
                      <br />
                      <small>{warehouse.contact_person_email || "N/A"}</small>
                    </td>
                    <td>{warehouse.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-body">
            <div className="alert alert-info text-center" role="alert">
              No warehouses found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessWarehouses;

import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} className="mt-6 ml-14">
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body> Do you really want to delete this record?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default  DeleteConfirmation;
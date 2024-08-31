import React from 'react';
import '../../../assets/styles/confirmodal.css';


const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) {
    return null; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
       <h6>Are you sure?</h6>
        <p style={{margin:"20px"}}>{message}</p>
        <div className="modal-actions">
          <button className="btn" Click={onClose}  style={{border:"1px solid green"}}>
            No
          </button>
          <button className="btn" onClick={onConfirm} style={{border:"1px solid red"}}>
            Yes 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

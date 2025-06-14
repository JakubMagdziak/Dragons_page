import React from 'react';
import './../styles/components/admin-panel/SuccessMessage.css';

function SuccessMessage({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div className="success-overlay">
      <div className="success-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default SuccessMessage;

import React from 'react';
import './../styles/components/admin-panel/ConfirmDialog.css';

function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="confirm-actions">
          <button onClick={onConfirm}>✅ Tak</button>
          <button onClick={onCancel}>❌ Nie</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

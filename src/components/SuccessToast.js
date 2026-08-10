import React, { useEffect } from 'react';
import './SuccessToast.css';

function SuccessToast({ show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast-overlay">
      <div className="toast">
        <div className="toast-icon">✓</div>
        <p className="toast-title">Confirmed</p>
        <p className="toast-message">Card details updated successfully!</p>
        <button className="toast-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SuccessToast;

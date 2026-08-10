import React, { useState } from 'react';
import './CardForm.css';

function CardForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input based on field type
    if (name === 'number') {
      // Allow only digits and spaces, max 16 digits
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 16);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === 'month') {
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === 'year') {
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 2);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    if (name === 'cvc') {
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 3);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format card number for display in the input
  const formatCardNumberInput = (num) => {
    return num.replace(/(.{4})(?=.)/g, '$1 ');
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Cardholder name is required";
    }

    // Card number validation
    if (!formData.number.trim()) {
      newErrors.number = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.number)) {
      newErrors.number = "Wrong format, numbers only";
    }

    // Month validation
    if (!formData.month.trim()) {
      newErrors.month = "Can't be blank";
    } else {
      const monthNum = parseInt(formData.month, 10);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        newErrors.month = "Invalid date";
      }
    }

    // Year validation
    if (!formData.year.trim()) {
      newErrors.year = "Can't be blank";
    } else if (!/^\d{2}$/.test(formData.year)) {
      newErrors.year = "Invalid date";
    }

    // CVC validation
    if (!formData.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "Wrong format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        month: formData.month.padStart(2, '0'),
        year: formData.year.padStart(2, '0'),
      });
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      {/* Cardholder Name */}
      <div className="form-group">
        <label htmlFor="cardholder-name" className="form-label">
          CARDHOLDER NAME
        </label>
        <input
          type="text"
          id="cardholder-name"
          name="name"
          className={`form-input ${errors.name ? 'input-error' : ''}`}
          placeholder="e.g. Jane Appleseed"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Card Number */}
      <div className="form-group">
        <label htmlFor="card-number" className="form-label">
          CARD NUMBER
        </label>
        <input
          type="text"
          id="card-number"
          name="number"
          className={`form-input ${errors.number ? 'input-error' : ''}`}
          placeholder="e.g. 1234 5678 9123 0000"
          value={formatCardNumberInput(formData.number)}
          onChange={handleChange}
          autoComplete="off"
          inputMode="numeric"
        />
        {errors.number && (
          <span className="error-message">{errors.number}</span>
        )}
      </div>

      {/* Expiry & CVC Row */}
      <div className="form-row">
        <div className="form-group form-group-exp">
          <label className="form-label">EXP. DATE (MM/YY)</label>
          <div className="exp-inputs">
            <div className="exp-field">
              <input
                type="text"
                id="exp-month"
                name="month"
                className={`form-input ${errors.month ? 'input-error' : ''}`}
                placeholder="MM"
                value={formData.month}
                onChange={handleChange}
                autoComplete="off"
                inputMode="numeric"
              />
              {errors.month && (
                <span className="error-message">{errors.month}</span>
              )}
            </div>
            <div className="exp-field">
              <input
                type="text"
                id="exp-year"
                name="year"
                className={`form-input ${errors.year ? 'input-error' : ''}`}
                placeholder="YY"
                value={formData.year}
                onChange={handleChange}
                autoComplete="off"
                inputMode="numeric"
              />
              {errors.year && (
                <span className="error-message">{errors.year}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group form-group-cvc">
          <label htmlFor="cvc" className="form-label">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            className={`form-input ${errors.cvc ? 'input-error' : ''}`}
            placeholder="e.g. 123"
            value={formData.cvc}
            onChange={handleChange}
            autoComplete="off"
            inputMode="numeric"
          />
          {errors.cvc && <span className="error-message">{errors.cvc}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        Confirm
      </button>
    </form>
  );
}

export default CardForm;

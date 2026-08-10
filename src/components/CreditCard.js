import React from 'react';
import './CreditCard.css';

function CreditCard({ cardData }) {
  const { name, number, month, year, cvc } = cardData;

  // Format card number into groups of 4
  const formatCardNumber = (num) => {
    const padded = num.padEnd(16, '0').replace(/[^0-9]/g, '').slice(0, 16);
    return padded.replace(/(.{4})/g, '$1 ').trim();
  };

  const displayNumber = number
    ? formatCardNumber(number)
    : '0000 0000 0000 0000';
  const displayName = name || 'JANE APPLESEED';
  const displayMonth = month || '00';
  const displayYear = year || '00';
  const displayCvc = cvc || '000';

  return (
    <div className="credit-card-container">
      {/* Back Card */}
      <div className="card card-back">
        <div className="card-back-inner">
          <div className="magnetic-stripe"></div>
          <div className="cvc-area">
            <div className="cvc-stripe"></div>
            <span className="cvc-number">{displayCvc}</span>
          </div>
        </div>
      </div>

      {/* Front Card */}
      <div className="card card-front">
        <div className="card-front-inner">
          <div className="card-logo">
            <div className="card-logo-circle"></div>
            <div className="card-logo-ring"></div>
          </div>
          <p className="card-number">{displayNumber}</p>
          <div className="card-details">
            <span className="card-holder">{displayName.toUpperCase()}</span>
            <span className="card-expiry">
              {displayMonth}/{displayYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;

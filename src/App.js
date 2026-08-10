import React, { useState, useCallback } from 'react';
import CreditCard from './components/CreditCard';
import CardForm from './components/CardForm';
import SuccessToast from './components/SuccessToast';
import './App.css';

function App() {
  // Card data displayed on the card preview
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: '',
  });

  const [showToast, setShowToast] = useState(false);

  const handleFormSubmit = (data) => {
    setCardData(data);
    setShowToast(true);
  };

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <div className="app">
      {/* Left Panel - Gradient Background + Card Preview */}
      <section className="left-panel" aria-label="Credit card preview">
        <div className="left-panel-content">
          <CreditCard cardData={cardData} />
        </div>
      </section>

      {/* Right Panel - Form */}
      <section className="right-panel" aria-label="Card details form">
        <div className="right-panel-content">
          <CardForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Success Toast */}
      <SuccessToast show={showToast} onClose={handleCloseToast} />
    </div>
  );
}

export default App;

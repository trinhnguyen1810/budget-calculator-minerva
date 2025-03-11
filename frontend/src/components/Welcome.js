import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext } from '../App';
import minervaLogo from '../assets/logo.jpeg';

const Welcome = () => {
  const navigate = useNavigate();
  const { resetBudgetData } = useContext(BudgetContext);

  // Reset data when starting fresh
  React.useEffect(() => {
    resetBudgetData();
  }, [resetBudgetData]);

  return (
    <div className="welcome-container">
      <div className="logo-container">
        <img src={minervaLogo} alt="Minerva Logo" className="logo" />
      </div>
      
      <h1 className="welcome-title">Minerva Budget Calculator</h1>
      
      <p className="welcome-text">
        Plan your finances wisely with our personalized budget calculator.
        We'll help you allocate your income based on your preferences and location.
      </p>
      
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Personalized</h3>
          <p>Tailored recommendations based on your spending habits</p>
        </div>
        
        <div className="feature-card">
          <h3>Location-Aware</h3>
          <p>Adjusts for cost of living in different cities</p>
        </div>
        
        <div className="feature-card">
          <h3>Visual Reports</h3>
          <p>See your budget breakdown with clear charts</p>
        </div>
        
        <div className="feature-card">
          <h3>Smart Savings</h3>
          <p>Plan for your future with intelligent savings allocations</p>
        </div>
      </div>
      
      <button 
        className="start-btn"
        onClick={() => navigate('/question1')}
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
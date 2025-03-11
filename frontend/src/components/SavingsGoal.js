import React, { useContext, useState } from 'react';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

const SavingsGoal = () => {
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [savingsPercentage, setSavingsPercentage] = useState(budgetData.savings_goal);
  const [error, setError] = useState('');
  
  // Calculate savings amount
  const totalIncome = budgetData.income.work_study + budgetData.income.external;
  const savingsAmount = (totalIncome * savingsPercentage) / 100;
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSavingsPercentage(value);
    setError('');
  };
  
  // Handle manual input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      setSavingsPercentage('');
      setError('Please enter a savings percentage');
      return;
    }
    
    const parsedValue = parseInt(value);
    
    if (isNaN(parsedValue)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (parsedValue < 0 || parsedValue > 50) {
      setError('Savings must be between 0-50%');
      return;
    }
    
    setSavingsPercentage(parsedValue);
    setError('');
  };
  
  // Handle next button click
  const handleNext = () => {
    updateBudgetData({ savings_goal: savingsPercentage });
  };

  return (
    <QuestionLayout 
      question="Question 3/6"
      title="How much would you like to save?"
      progress={3/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Set a savings goal as a percentage of your income. We recommend saving at least 10-20% if possible.
        </p>
        
        <div className="savings-section">
          <div className="savings-slider-container">
            <input
              type="range"
              min="0"
              max="50"
              value={savingsPercentage}
              onChange={handleSliderChange}
              className="savings-slider"
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>
          
          <div className="savings-input-group">
            <input
              type="text"
              value={savingsPercentage}
              onChange={handleInputChange}
              className="savings-input"
            />
            <span className="savings-input-suffix">%</span>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="savings-amount-display">
            <div className="savings-amount-title">Savings Amount:</div>
            <div className="savings-amount-value">
              ${savingsAmount.toFixed(2)} 
              <span className="savings-amount-period">
                {budgetData.time_preference === 'weekly' ? '/week' : '/month'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="savings-tips">
          <h3>Tips for Saving</h3>
          <ul>
            <li>Start small if you need to - even 5% makes a difference</li>
            <li>Consider setting up automatic transfers to a savings account</li>
            <li>Aim to build an emergency fund of 3-6 months of expenses</li>
          </ul>
        </div>
      </div>
      
      <NavButtons 
        prevPath="/question2"
        nextPath="/question4"
        nextDisabled={savingsPercentage === '' || error !== ''}
        onNext={handleNext}
      />
    </QuestionLayout>
  );
};

export default SavingsGoal;
import React, { useContext, useState, useEffect } from 'react';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

const FixedExpenses = () => {
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [loans, setLoans] = useState(budgetData.fixed_expenses.loans || '');
  const [other, setOther] = useState(budgetData.fixed_expenses.other || '');
  const [errors, setErrors] = useState({});
  
  // Calculate total fixed expenses
  const totalFixed = (parseFloat(loans) || 0) + (parseFloat(other) || 0);
  
  // Validate inputs
  useEffect(() => {
    const newErrors = {};
    
    if (loans !== '' && (isNaN(loans) || parseFloat(loans) < 0)) {
      newErrors.loans = 'Please enter a valid amount (0 or greater)';
    }
    
    if (other !== '' && (isNaN(other) || parseFloat(other) < 0)) {
      newErrors.other = 'Please enter a valid amount (0 or greater)';
    }
    
    setErrors(newErrors);
  }, [loans, other]);
  
  // Check if form is valid
  const isValid = 
    loans !== '' && 
    other !== '' && 
    Object.keys(errors).length === 0;
  
  // Handle next button click
  const handleNext = () => {
    updateBudgetData({
      fixed_expenses: {
        loans: parseFloat(loans) || 0,
        other: parseFloat(other) || 0
      }
    });
  };

  return (
    <QuestionLayout 
      question="Question 5/6"
      title="What are your fixed expenses?"
      progress={5/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Fixed expenses are regular, essential costs that remain relatively constant each 
          {budgetData.time_preference === 'weekly' ? ' week' : ' month'}.
        </p>
        
        <div className="input-section">
          <div className="form-group">
            <label htmlFor="loans">Loans & Debt Payments</label>
            <div className="input-with-prefix">
              <span className="input-prefix">$</span>
              <input
                type="number"
                id="loans"
                value={loans}
                onChange={(e) => setLoans(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.loans && <div className="error-message">{errors.loans}</div>}
            <div className="input-hint">Student loans, credit card payments, etc.</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="other">Other Fixed Expenses</label>
            <div className="input-with-prefix">
              <span className="input-prefix">$</span>
              <input
                type="number"
                id="other"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.other && <div className="error-message">{errors.other}</div>}
            <div className="input-hint">Utilities, subscriptions, insurance, etc.</div>
          </div>
          
          <div className="total-section">
            <span className="total-label">Total Fixed Expenses:</span>
            <span className="total-amount">${totalFixed.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="info-box">
          <h3 className="info-title">What counts as a fixed expense?</h3>
          <ul className="info-list">
            <li>Rent or housing payments</li>
            <li>Utilities (electricity, water, internet)</li>
            <li>Insurance premiums</li>
            <li>Loan payments</li>
            <li>Regular subscriptions</li>
          </ul>
        </div>
      </div>
      
      <NavButtons 
        prevPath="/question4"
        nextPath="/question6"
        nextDisabled={!isValid}
        onNext={handleNext}
      />
    </QuestionLayout>
  );
};

export default FixedExpenses;
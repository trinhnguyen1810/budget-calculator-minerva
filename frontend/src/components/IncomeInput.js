import React, { useContext, useState, useEffect } from 'react';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

const IncomeInput = () => {
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [workStudy, setWorkStudy] = useState(budgetData.income.work_study || '');
  const [external, setExternal] = useState(budgetData.income.external || '');
  const [errors, setErrors] = useState({});
  
  // Calculate total income
  const totalIncome = (parseFloat(workStudy) || 0) + (parseFloat(external) || 0);
  
  // Validate inputs
  useEffect(() => {
    const newErrors = {};
    
    if (workStudy !== '' && (isNaN(workStudy) || parseFloat(workStudy) < 0)) {
      newErrors.workStudy = 'Please enter a valid amount (0 or greater)';
    }
    
    if (external !== '' && (isNaN(external) || parseFloat(external) < 0)) {
      newErrors.external = 'Please enter a valid amount (0 or greater)';
    }
    
    setErrors(newErrors);
  }, [workStudy, external]);
  
  // Check if form is valid
  const isValid = 
    workStudy !== '' && 
    external !== '' && 
    Object.keys(errors).length === 0 &&
    totalIncome > 0;
  
  // Handle next button click
  const handleNext = () => {
    updateBudgetData({
      income: {
        work_study: parseFloat(workStudy) || 0,
        external: parseFloat(external) || 0
      }
    });
  };

  return (
    <QuestionLayout 
      question="Question 2/6"
      title={`What's your ${budgetData.time_preference} income?`}
      progress={2/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Please enter your income from different sources.
          {budgetData.time_preference === 'weekly' 
            ? ' Enter your weekly amounts.' 
            : ' Enter your monthly amounts.'}
        </p>
        
        <div className="input-section">
          <div className="form-group">
            <label htmlFor="workStudy">Work/Study Income</label>
            <div className="input-with-prefix">
              <span className="input-prefix">$</span>
              <input
                type="number"
                id="workStudy"
                value={workStudy}
                onChange={(e) => setWorkStudy(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.workStudy && <div className="error-message">{errors.workStudy}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="external">External Resources</label>
            <div className="input-with-prefix">
              <span className="input-prefix">$</span>
              <input
                type="number"
                id="external"
                value={external}
                onChange={(e) => setExternal(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.external && <div className="error-message">{errors.external}</div>}
          </div>
          
          <div className="total-section">
            <span className="total-label">Total Income:</span>
            <span className="total-amount">${totalIncome.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="hint">
          <p>* External resources can include family support, scholarships, etc.</p>
          <p>* Enter 0 if you don't have income from a particular source.</p>
        </div>
      </div>
      
      <NavButtons 
        prevPath="/question1"
        nextPath="/question3"
        nextDisabled={!isValid}
        onNext={handleNext}
      />
    </QuestionLayout>
  );
};

export default IncomeInput;
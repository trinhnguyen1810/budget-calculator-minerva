import React, { useContext, useState } from 'react';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

const TimePreference = () => {
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [selectedPreference, setSelectedPreference] = useState(budgetData.time_preference);
  
  const handleSelect = (preference) => {
    setSelectedPreference(preference);
    updateBudgetData({ time_preference: preference });
  };

  return (
    <QuestionLayout 
      question="Question 1"
      title="How would you like to plan your budget?"
      progress={1/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Choose whether you want to plan your budget on a weekly or monthly basis.
        </p>
        
        <div className="option-cards">
          <div 
            className={`option-card ${selectedPreference === 'weekly' ? 'selected' : ''}`}
            onClick={() => handleSelect('weekly')}
          >
            <div className="option-card-header">Weekly</div>
            <div className="option-card-content">
              <p>Plan your budget week by week</p>
              <ul>
                <li>Easier for variable income</li>
                <li>Good for short-term planning</li>
                <li>Helpful for weekly expenses</li>
              </ul>
            </div>
          </div>
          
          <div 
            className={`option-card ${selectedPreference === 'monthly' ? 'selected' : ''}`}
            onClick={() => handleSelect('monthly')}
          >
            <div className="option-card-header">Monthly</div>
            <div className="option-card-content">
              <p>Plan your budget month by month</p>
              <ul>
                <li>Better for consistent income</li>
                <li>Good for recurring bills</li>
                <li>Easier for long-term planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <NavButtons 
        prevPath="/"
        nextPath="/question2"
        nextDisabled={!selectedPreference}
      />
    </QuestionLayout>
  );
};

export default TimePreference;
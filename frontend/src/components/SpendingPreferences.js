import React, { useContext, useState } from 'react';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

// Category descriptions
const categories = [
  {
    id: 'food',
    name: 'Groceries & Food',
    description: 'Includes groceries, dining out, and all food-related expenses.'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Public transit, ride-sharing services, or vehicle expenses including gas.'
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Leisure',
    description: 'Movies, concerts, subscriptions, and other leisure activities.'
  },
  {
    id: 'personal',
    name: 'Personal Items',
    description: 'Shopping, personal care items, and miscellaneous expenses.'
  },
  {
    id: 'gym',
    name: 'Health & Fitness',
    description: 'Fitness memberships, classes, and health-related activities.'
  }
];

const SpendingPreferences = () => {
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [preferences, setPreferences] = useState(budgetData.spending_preferences);
  
  // Handle preference change
  const handlePreferenceChange = (categoryId, value) => {
    setPreferences({
      ...preferences,
      [categoryId]: parseInt(value)
    });
  };
  
  // Handle next button click
  const handleNext = () => {
    updateBudgetData({ spending_preferences: preferences });
  };
  
  // Preference level descriptions
  const preferenceLabels = {
    1: 'Minimal',
    2: 'Moderate',
    3: 'Premium'
  };

  return (
    <QuestionLayout 
      question="Question 4/6"
      title="How would you like to allocate your spending?"
      progress={4/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Rate your spending priority for each category from 1 (minimal) to 3 (premium).
          This helps us personalize your budget based on your lifestyle preferences.
        </p>
        
        <div className="spending-preferences-container">
          {categories.map(category => (
            <div key={category.id} className="preference-item">
              <div className="preference-header">
                <h3 className="preference-title">{category.name}</h3>
                <div className="preference-level">
                  {preferenceLabels[preferences[category.id]]}
                </div>
              </div>
              
              <p className="preference-description">{category.description}</p>
              
              <div className="preference-slider-container">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={preferences[category.id]}
                  onChange={(e) => handlePreferenceChange(category.id, e.target.value)}
                  className="preference-slider"
                />
                <div className="preference-labels">
                  <span>Minimal</span>
                  <span>Moderate</span>
                  <span>Premium</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="preferences-note">
          <p>Note: These preferences will influence how your discretionary spending is allocated. 
            Choose "Premium" for categories where you want more spending room.</p>
        </div>
      </div>
      
      <NavButtons 
        prevPath="/question3"
        nextPath="/question5"
        onNext={handleNext}
      />
    </QuestionLayout>
  );
};

export default SpendingPreferences;
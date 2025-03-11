import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetContext, NavButtons } from '../App';
import QuestionLayout from './QuestionLayout';

// City data with relative cost of living index
const cities = [
  { id: 'San Francisco', name: 'San Francisco', costIndex: 100 },
  { id: 'Berlin', name: 'Berlin', costIndex: 65 },
  { id: 'Taipei', name: 'Taipei', costIndex: 55 },
  { id: 'Hyderabad', name: 'Hyderabad', costIndex: 40 },
  { id: 'Seoul', name: 'Seoul', costIndex: 70 },
  { id: 'Buenos Aires', name: 'Buenos Aires', costIndex: 50 }
];

const LocationSelection = () => {
  const navigate = useNavigate();
  const { budgetData, updateBudgetData } = useContext(BudgetContext);
  const [selectedLocation, setSelectedLocation] = useState(budgetData.location);
  const [loading, setLoading] = useState(false);
  
  const handleSelect = (cityId) => {
    setSelectedLocation(cityId);
  };
  
  const handleSubmit = async () => {
    updateBudgetData({ location: selectedLocation });
    
    setLoading(true);
    
    // In a real app, we'd make an API call to get recommendations
    // For this demo, we'll just redirect to recommendations after a short delay
    setTimeout(() => {
      navigate('/recommendations');
      setLoading(false);
    }, 500);
  };

  return (
    <QuestionLayout 
      question="Question 6/6"
      title="Where are you located?"
      progress={6/6 * 100}
    >
      <div className="question-content">
        <p className="question-description">
          Your location helps us adjust your budget for local cost of living. 
          Select the city that's closest to where you live or plan to live.
        </p>
        
        <div className="location-grid">
          {cities.map(city => (
            <div 
              key={city.id}
              className={`location-card ${selectedLocation === city.id ? 'selected' : ''}`}
              onClick={() => handleSelect(city.id)}
            >
              <div className="location-name">{city.name}</div>
              <div className="location-cost">
                Cost index: <span className="cost-value">{city.costIndex}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="location-info">
          <p>The cost index represents relative cost of living, with San Francisco as the baseline (100).</p>
          <p>A lower number means your money will go further in that location.</p>
        </div>
      </div>
      
      <div className="nav-buttons">
        <button 
          className="btn-outline" 
          onClick={() => navigate('/question5')}
        >
          Back
        </button>
        
        <button 
          className="btn-primary btn-calculate" 
          onClick={handleSubmit}
          disabled={!selectedLocation || loading}
        >
          {loading ? 'Calculating...' : 'Calculate My Budget'}
        </button>
      </div>
    </QuestionLayout>
  );
};

export default LocationSelection;
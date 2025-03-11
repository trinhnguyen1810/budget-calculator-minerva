import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import components
import Welcome from './components/Welcome';
import TimePreference from './components/TimePreference';
import IncomeInput from './components/IncomeInput';
import SavingsGoal from './components/SavingsGoal';
import SpendingPreferences from './components/SpendingPreferences';
import FixedExpenses from './components/FixedExpenses';
import LocationSelection from './components/LocationSelection';
import Recommendations from './components/Recommendations';

// Import styles
import './styles/App.css';

// Budget Calculator Context
export const BudgetContext = React.createContext();

function App() {
  // State for budget data
  const [budgetData, setBudgetData] = useState({
    time_preference: 'monthly',
    income: {
      work_study: 0,
      external: 0
    },
    savings_goal: 10,
    spending_preferences: {
      food: 2,
      transportation: 2,
      entertainment: 2,
      personal: 2,
      gym: 2
    },
    fixed_expenses: {
      loans: 0,
      other: 0
    },
    location: ''
  });

  // Function to update budget data
  const updateBudgetData = (updates) => {
    setBudgetData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to reset budget data
  const resetBudgetData = () => {
    setBudgetData({
      time_preference: 'monthly',
      income: {
        work_study: 0,
        external: 0
      },
      savings_goal: 10,
      spending_preferences: {
        food: 2,
        transportation: 2,
        entertainment: 2,
        personal: 2,
        gym: 2
      },
      fixed_expenses: {
        loans: 0,
        other: 0
      },
      location: ''
    });
  };

  return (
    <BudgetContext.Provider value={{ budgetData, updateBudgetData, resetBudgetData }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/question1" element={<TimePreference />} />
            <Route path="/question2" element={<IncomeInput />} />
            <Route path="/question3" element={<SavingsGoal />} />
            <Route path="/question4" element={<SpendingPreferences />} />
            <Route path="/question5" element={<FixedExpenses />} />
            <Route path="/question6" element={<LocationSelection />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </BudgetContext.Provider>
  );
}

// Navigation buttons component
export const NavButtons = ({ prevPath, nextPath, nextDisabled = false, onNext = null }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextPath) {
      navigate(nextPath);
    }
  };

  return (
    <div className="nav-buttons">
      {prevPath && (
        <button 
          className="btn-outline" 
          onClick={() => navigate(prevPath)}
        >
          <ChevronLeft size={18} />
          Back
        </button>
      )}
      
      {nextPath && (
        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={nextDisabled}
        >
          Next
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default App;
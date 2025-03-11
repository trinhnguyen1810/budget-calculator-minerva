import React from 'react';
import minervaLogo from '../assets/logo.jpeg';

const QuestionLayout = ({ question, title, progress, children }) => {
  return (
    <div className="question-layout">
      <div className="header">
        <img src={minervaLogo} alt="Minerva Logo" className="logo-small" />
        <h1 className="app-title">Budget Calculator</h1>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">{question}</div>
      </div>
      
      <div className="question-container">
        <h2 className="question-title">{title}</h2>
        
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;
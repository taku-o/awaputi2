import React from 'react';

export interface TestButtonProps {
  label: string;
  onClick?: () => void;
}

export const TestButton: React.FC<TestButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      {label} (v0.0.2)
    </button>
  );
};

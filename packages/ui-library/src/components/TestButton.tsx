import React from 'react';

export interface TestButtonProps {
  label: string;
  onClick?: () => void;
}

export const TestButton: React.FC<TestButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: '8px 16px' }}>
      {label}
    </button>
  );
};

import React from 'react';

interface HighlightTextProps {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ 
  children, 
  color = '#ffffff',
  backgroundColor = '#646cff'
}) => {
  return (
    <span 
      style={{
        color,
        backgroundColor,
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 'bold',
        display: 'inline-block',
        margin: '0 2px'
      }}
    >
      {children}
    </span>
  );
};

export default HighlightText;

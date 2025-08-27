import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'medium'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: '#6c757d', color: 'white' };
      case 'success':
        return { backgroundColor: '#28a745', color: 'white' };
      case 'danger':
        return { backgroundColor: '#dc3545', color: 'white' };
      default:
        return { backgroundColor: '#646cff', color: 'white' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '4px 8px', fontSize: '12px' };
      case 'large':
        return { padding: '12px 24px', fontSize: '18px' };
      default:
        return { padding: '8px 16px', fontSize: '14px' };
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: '0 4px',
        transition: 'opacity 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </button>
  );
};

export default Button;

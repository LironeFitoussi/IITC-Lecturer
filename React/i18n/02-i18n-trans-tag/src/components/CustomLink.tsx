import React from 'react';

interface CustomLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({ 
  href = "#", 
  className = "custom-link", 
  children,
  onClick 
}) => {
  return (
    <a 
      href={href} 
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        else console.log(`Clicked link: ${href}`);
      }}
      style={{
        color: '#646cff',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      {children}
    </a>
  );
};

export default CustomLink;

import React from "react";

interface ButtonProps {
  onClick: (event: any) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-purple text-white rounded-lg px-4 py-2 shadow-sm hover:shadow-lg w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const OutlinedButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-transparent border-2 border-light-purple text-light-purple hover:text-white hover:bg-light-purple font-medium py-2 px-4 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

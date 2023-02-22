import styled from "styled-components";
import React, { useState } from "react";
import ArrowRight from "../icons/ArrowRight/ArrowRight";

interface EnterButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonView = styled.button`
  font-family: "JetBrains Mono", monospace;
  background: none;
  border: 0;
  text-align: left;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 0;
  position: relative;
  width: 100%;
  height: 40px;
  color: #000;

  svg {
    @media (max-width: 480px) {
      transform: scale(0.8);
    }

  &:hover {
    cursor: pointer;
    & > svg {
      /* opacity: 0.7; */
    }
  }
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const EnterButton: React.FC<EnterButtonProps> = ({
  onClick,
  children,
  text,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ButtonView
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowRight strokeColor={isHovered ? "#808080" : "#000000"} />
    </ButtonView>
  );
};

export default EnterButton;

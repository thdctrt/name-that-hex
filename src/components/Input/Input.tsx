import styled from "styled-components";
import React from "react";

interface InputProps {
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  defaultValue: string;
}

const InputField = styled.input`
  font-family: "JetBrains Mono", monospace;
  position: relative;
  width: 480px;
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 100%;
  letter-spacing: 0.1em;
  color: #000000;
  text-align: left;
  text-transform: uppercase;
  border: 0;
  -webkit-box-shadow: none;
  box-shadow: none;

  @media screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 64px;
    width: 320px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
    width: 160px;
  }

  //TODO: validate on pressing Enter, not only on Focus
  &:not(:focus):not(:placeholder-shown):invalid {
    color: red;
  }

  &:not(:focus):not(:placeholder-shown):invalid ~ img {
    opacity: 0.2;
    filter: blur(1px);
  }

  // for cases without button, where validation on losing focus cant be a thing
  /* &:invalid {
    color: red;
  }
  &:invalid ~ img {
    opacity: 0.2;
    filter: blur(1px);
  } */
`;

const Input: React.FC<InputProps> = ({ onChange, onKeyDown, defaultValue }) => {
  return (
    <InputField
      aria-label="Enter your HEX"
      onChange={onChange}
      onKeyDown={onKeyDown}
      type="text"
      name="description"
      required
      defaultValue={defaultValue}
      placeholder="#URHEX↓"
      pattern="#?(?:[A-Fa-f0-9]{3}){1,2}\b"
    />
  );
};

export default Input;

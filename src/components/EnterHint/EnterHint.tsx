import styled from "styled-components";
import React from "react";
import Image from "next/image";

const EnterOption = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-weight: 200;
  font-size: 12px;

  @media screen and (max-width: 480px) {
    display: none;
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
    align-items: flex-start;
    gap: 2px;
  }
`;

const EnterKbd = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: #333;
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-weight: 200;
  font-size: 12px;
  line-height: 100%;
  background: #eee;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  padding: 4px;
  white-space: nowrap;
  width: auto;
`;

const EnterIcon = styled(Image)``;

const EnterHint: React.FC = ({}) => {
  return (
    <EnterOption>
      or press
      <EnterKbd>
        <EnterIcon
          src="/assets/enter.svg"
          alt="Enter icon"
          height={16}
          width={16}
        />

        <span>Return</span>
      </EnterKbd>
    </EnterOption>
  );
};

export default EnterHint;

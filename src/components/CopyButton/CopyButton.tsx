import styled from "styled-components";
import React, { useState } from "react";
import Image from "next/image";

interface CopyButtonProps {
  onClick?: () => void;
  changeBy?: boolean;
}

const Copy = styled.button`
  background: none;
  border: 0;
`;

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, changeBy }) => {
  return (
    <Copy onClick={onClick}>
      <Image
        src={changeBy ? "/assets/copy-done.svg" : "/assets/copy.svg"}
        alt="Enter icon"
        height={32}
        width={32}
        className="svg-icon"
      />
    </Copy>
  );
};

export default CopyButton;

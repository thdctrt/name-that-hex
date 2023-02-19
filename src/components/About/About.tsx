import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  width: 1056px;
`;
const Description = styled.p`
  font-family: "JetBrains Mono", monospace;
  text-align: left;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 24px;
  color: black;
  background: #f7f7f7;
  padding: 40px;
  border-radius: 40px;
`;

export default function About() {
  return (
    <AboutContainer>
      <Description>About</Description>
    </AboutContainer>
  );
}

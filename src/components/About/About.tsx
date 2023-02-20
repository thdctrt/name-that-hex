import React from "react";
import styled from "styled-components";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

const AboutContainer = styled.div`
  max-width: 560px;

  @media screen and (max-width: 480px) {
    max-width: calc(100% - 16px);
  }
`;
const Description = styled.div`
  font-family: "JetBrains Mono", monospace;
  text-align: left;
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  color: black;
  background: #f7f7f7;
  padding: 40px;
  border-radius: 40px;
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 480px) {
    padding: 24px;
    border-radius: 24px;
  }

  p:first-child,
  span.strong {
    font-weight: 600;
  }

  p code {
    font-weight: 200;
    background: #ddd;
    padding: 2px;
    border-radius: 4px;
  }
`;

const MadeBy = styled.div`
  padding-top: 40px;

  a {
    border-bottom: 1px solid #000000e6;
    transition: all 0.5s ease-in-out;
  }
  a:hover {
    border-bottom: 1px solid #00000080;
    color: #00000080;
    transition: all 0.5s ease-in-out;
  }
`;

const GitLink = styled.a`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 0.5;
    transition: all 0.5s ease-in-out;
  }
`;

export default function About() {
  return (
    <AboutContainer>
      <Description>
        <p>
          Need a catchy name for the color and tired of&nbsp;LightBlue,
          LigherThanBlue, SuperLightBlue?
        </p>
        <p>
          <Balancer ratio={1}>
            <span className="strong">Name that HEX!</span> relieves you of
            inventing a creative and understandable name — it uses{" "}
            <code>da&#8209;vinci</code> Text AI by OpenAI and comes up with a
            name for every custom color you need to name. Colors are already
            preformatted in CamelCase, so you can seamlessly use them in Figma
            and JS code both.
          </Balancer>
        </p>
        <MadeBy>
          Made using{" "}
          <a href="https://openai.com/api/?source=name-that-hex" target="blank">
            OpenAI API
          </a>{" "}
          and{" "}
          <a href="https://nextjs.org/?source=name-that-hex" target="blank">
            Next.js
          </a>{" "}
          by{" "}
          <a href="https://tokunov.design/?source=name-that-hex" target="blank">
            @thdctrt
          </a>{" "}
        </MadeBy>
        <GitLink href="https://github.com/thdctrt/name-that-hex" target="blank">
          <Image
            src="/assets/github.svg"
            width={24}
            height={24}
            alt="github logo"
          />
          Source code
        </GitLink>
      </Description>
    </AboutContainer>
  );
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import styled from "styled-components";
import Image from "next/image";

var ColorBlockColor: string | null;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ColorBlock = styled.div<{ blockColor: string | null }>`
  background: ${(props) => props.blockColor || "white"};
  color: ${(props) =>
    tinycolor(props.blockColor || "white").isLight() == true
      ? "black "
      : "white"};
  font-family: "JetBrains Mono", monospace;
  width: 1056px;
  border-radius: 100%;
  padding: 80px;
  text-align: center;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 0.1em;

  p {
    font-size: 48px;
    line-height: 100%;
  }

  p.result {
  font-size: 96px;
  line-height: 100%;
  padding-top: 24px;
  }
`;

const Button = styled.button<{ isShown: string | null }>`
  visibility: ${(props) => props.isShown || "visible"}; ;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  gap: 72px;
  height: 280px;
  width: 1056px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-left: 108px;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA1NiIgaGVpZ2h0PSIyODAiIHZpZXdCb3g9IjAgMCAxMDU2IDI4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwLjg5OTQgOTkuNDE2TDE1Ni4zMDkgMTcuNDE2QzE2NS42MzcgMTEuMzE3MiAxNzYuODY3IDguMDAwMDMgMTg4LjQ0IDguMDAwMDNMODY3LjU2IDhDODc5LjEzMyA4IDg5MC4zNjMgMTEuMzE3MiA4OTkuNjkxIDE3LjQxNkwxMDI1LjEgOTkuNDE1OUMxMDU1LjYzIDExOS4zOCAxMDU1LjYzIDE2MC42MiAxMDI1LjEgMTgwLjU4NEw4OTkuNjkxIDI2Mi41ODRDODkwLjM2MyAyNjguNjgzIDg3OS4xMzMgMjcyIDg2Ny41NiAyNzJMMTg4LjQ0IDI3MkMxNzYuODY3IDI3MiAxNjUuNjM3IDI2OC42ODMgMTU2LjMwOSAyNjIuNTg0TDMwLjg5OTQgMTgwLjU4NEMwLjM2Njg1NyAxNjAuNjIgMC4zNjY4NTggMTE5LjM4IDMwLjg5OTQgOTkuNDE2WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMTYiLz4KPC9zdmc+Cg==)
    no-repeat;

  //TODO: validate on pressing Enter, not only on Focus
  /* & input:not(:focus):not(:placeholder-shown):invalid {
    color: red;
  }
  & input:not(:focus):not(:placeholder-shown):invalid ~ img{
    opacity: 0.2;
    filter: blur(1px);
  } */
  & input:invalid {
    color: red;
  }
  & input:invalid ~ img {
    opacity: 0.2;
    filter: blur(1px);
  }
`;

const Input = styled.input`
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
`;

const EnterHint = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: #333;
  font-family: "JetBrains Mono", monospace;
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 100%;
  background: #eee;
  border-radius: 4px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  padding: 4px;
  white-space: nowrap;
`;

const EnterIcon = styled(Image)``;

const HEXInput: React.FC = () => {
  const [value, setValue] = React.useState<string>(
    `${
      typeof window !== "undefined" && localStorage.getItem("hex-hex")
        ? localStorage.getItem("hex-hex")
        : ""
    }`
  );
  const [prompt, setPrompt] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [isStatus, setIsStatus] = useState(false);

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO: add hash if no hash in value
      // {e.target.value.match(/#/)? console.log("with") : console.log("without") }
      setValue(e.target.value);
      // console.log(e.target.value);
      setIsStatus(false);
      // console.log(isStatus);
    },
    []
  );

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setPrompt(value);
        localStorage.setItem("hex-hex", value);
        setIsStatus(false);
        setColor("...");
        // console.log(color);
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value }),
        });
        if (response) {
          setIsStatus(true);
          // console.log(isStatus);
        }

        const data = await response.json();
        setColor(`${data.result.choices[0].text}`);
      }
    },
    [value]
  );

  useEffect(() => {
    typeof window !== "undefined"
      ? (ColorBlockColor = localStorage.getItem("hex-hex"))
      : (ColorBlockColor = "transparent");
  });

  const handleClick = useCallback(async () => {
    if (localStorage.getItem("hex-hex")) {
      //scenario 1 - value in local storage
      let value = localStorage.getItem("hex-hex") || "undefined";
      setPrompt(value);
      console.log("got " + value + " from local storage");
      setColor("...");
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value }),
      });
      const data = await response.json();
      setColor(`${data.result.choices[0].text}`);
      // setColorBlock(value);
      //end scenario 1

      //scenario 2 - no local storage but value in input
    } else if (value && localStorage.getItem("hex-hex")) {
      localStorage.setItem("hex-hex", value);
      //scenario 2.5
    } else if (value) {
      localStorage.setItem("hex-hex", value);
      setPrompt(value);
      console.log(value);
      setColor("Loading...");
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value }),
      });
      const data = await response.json();
      setColor(`${data.result.choices[0].text}`);
      //end scenario 2
      //scenario 3 — input not filled
    } else {
      alert("no value");
    }
  }, []);

  return (
    <Container>
      <Field>
        <Input
          aria-label="Enter your HEX"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          name="description"
          defaultValue={value}
          placeholder="#URHEX↓"
          pattern="#(?:[A-Fa-f0-9]{3}){1,2}\b"
        />
        <EnterHint>
          <EnterIcon
            priority
            src="/assets/enter.svg"
            alt="Enter icon"
            height={32}
            width={32}
          />
          <span>Return</span>
        </EnterHint>
      </Field>
      {color && (
        <ColorBlock blockColor={ColorBlockColor}>
          <p>Let's says it's</p>
          <p className="result">{color}</p>
        </ColorBlock>
      )}

      {color ? (
        <Button
          onClick={handleClick}
          isShown={value && isStatus == true ? "visible" : "hidden"}
        >
          {!color ? "Find" : "Find again"}
        </Button>
      ) : null}
    </Container>
  );
};

export default HEXInput;

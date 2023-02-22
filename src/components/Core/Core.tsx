"use client";

import React, { useCallback, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import styled from "styled-components";
import Draggable from "react-draggable";
import EnterButton from "../EnterButton/EnterButton";
import EnterHint from "../EnterHint/EnterHint";
import CopyButton from "../CopyButton/CopyButton";
import Input from "../Input/Input";
import RadioGroup from "../RadioGroup/RadioGroup";

var ColorBlockColor: string | null;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  padding-top: 80px;
  width: 100%;

  @media screen and (max-width: 480px) {
    padding-top: 24px;
    gap: 24px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorBlock = styled.div<{ blockColor: string | null }>`
  background: ${(props) => props.blockColor || "#ababab"};
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  p {
    font-size: 48px;
    line-height: 100%;

    @media screen and (min-width: 769px) and (max-width: 1112px) {
      font-size: 40px;
    }

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  .result {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    padding-top: 24px;
    justify-content: center;

    @media screen and (max-width: 480px) {
      width: 100%;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .svg-icon {
    filter: invert(
      ${(props) =>
        tinycolor(props.blockColor || "1").isLight() == true ? "0" : "1"}
    );
  }

  .result__text {
    font-size: 96px;
    line-height: 100%;
    overflow-wrap: break-word;
    width: calc(1056px - 32px);

    @media screen and (max-width: 480px) {
      font-size: 32px;
      width: calc(100% + 32px);
    }

    @media screen and (min-width: 481px) and (max-width: 768px) {
      font-size: 64px;
      width: calc(100% - 16px);
    }

    @media screen and (min-width: 769px) and (max-width: 1112px) {
      width: 800px;
    }
  }

  @media screen and (max-width: 480px) {
    width: calc(100% + 32px);
    padding: 64px;
    border-radius: 50%;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: calc(100% - 16px);
    padding: 64px;
  }

  @media screen and (min-width: 769px) and (max-width: 1112px) {
    width: 900px;
  }
`;

const Button = styled.button<{
  isShown: string | null;
  buttonColor: string | null;
}>`
  visibility: ${(props) => props.isShown || "visible"};
  width: 320px;
  height: 80px;
  border: 0;
  transform: skew(-20deg);
  border-radius: 8px;
  margin-top: 40px;
  background: ${(props) =>
    tinycolor(props.buttonColor || "white")
      .complement()
      .toHexString() != "#ffffff" &&
    tinycolor(props.buttonColor || "white")
      .complement()
      .toHexString() != "#000000"
      ? tinycolor(props.buttonColor || "white")
          .complement()
          .toHexString()
      : "#FC5A50"};
  font-family: "JetBrains Mono", monospace;
  text-align: center;
  font-style: normal;
  font-weight: 800;
  transition: transform 0.2s ease-in-out;
  letter-spacing: 0.1em;
  font-size: 32px;
  color: ${(props) =>
    tinycolor(props.buttonColor || "white").isLight() == true
      ? "black "
      : "white"};

  &:hover {
    filter: hue-rotate(90deg);
    animation: changeColors 2s ease-out infinite;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    transform: scale(0.98) skew(-30deg);
  }

  @keyframes changeColors {
    0% {
      filter: hue-rotate(0deg);
    }

    25% {
      filter: hue-rotate(90deg);
    }

    50% {
      filter: hue-rotate(180deg);
    }

    75% {
      filter: hue-rotate(270deg);
    }

    100% {
      filter: hue-rotate(360deg);
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 24px;
    height: 64px;
    width: 100%;
    margin-top: 16px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  height: 280px;
  width: 1056px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA1NiIgaGVpZ2h0PSIyODAiIHZpZXdCb3g9IjAgMCAxMDU2IDI4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwLjg5OTQgOTkuNDE2TDE1Ni4zMDkgMTcuNDE2QzE2NS42MzcgMTEuMzE3MiAxNzYuODY3IDguMDAwMDMgMTg4LjQ0IDguMDAwMDNMODY3LjU2IDhDODc5LjEzMyA4IDg5MC4zNjMgMTEuMzE3MiA4OTkuNjkxIDE3LjQxNkwxMDI1LjEgOTkuNDE1OUMxMDU1LjYzIDExOS4zOCAxMDU1LjYzIDE2MC42MiAxMDI1LjEgMTgwLjU4NEw4OTkuNjkxIDI2Mi41ODRDODkwLjM2MyAyNjguNjgzIDg3OS4xMzMgMjcyIDg2Ny41NiAyNzJMMTg4LjQ0IDI3MkMxNzYuODY3IDI3MiAxNjUuNjM3IDI2OC42ODMgMTU2LjMwOSAyNjIuNTg0TDMwLjg5OTQgMTgwLjU4NEMwLjM2Njg1NyAxNjAuNjIgMC4zNjY4NTggMTE5LjM4IDMwLjg5OTQgOTkuNDE2WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMTYiLz4KPC9zdmc+Cg==)
    no-repeat;
  background-size: contain;

  @media screen and (max-width: 480px) {
    width: calc(100% - 32px);
    height: auto;
    background: none;
    flex-direction: column;
    gap: 0;
    border: 2px solid #000000;
    padding: 16px;
    align-items: flex-start;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: calc(100% - 16px);
    height: 200px;
    padding-left: 128px;
    padding-right: 128px;
  }

  @media screen and (min-width: 769px) and (max-width: 1112px) {
    width: 900px;
    height: 240px;
    background-size: contain;
  }
`;

const EnterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: start;
  width: 160px;
  margin-top: 32px;

  @media (max-width: 480px) {
    margin-top: 16px;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1023px) {
    margin-top: 0;
  }
`;

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
  const [isCopied, setIsCopied] = useState(false);
  const [theme, setTheme] = React.useState("alchemy and chemistry");

  const handleChange = (event: any) => {
    setTheme(event.target.value);
  };

  const resetRadioState = () => {
    setTheme("alchemy and chemistry");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.match("#")) {
        // console.log("with");
        setValue(e.target.value);
        setIsStatus(false);
      } else {
        // console.log("without");
        setValue("#" + e.target.value);
        setIsStatus(false);
      }
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
        console.log("send value " + value);
        console.log("send theme " + theme);
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value, themeValue: theme }),
        });
        if (response) {
          setIsStatus(true);
        }

        const data = await response.json();
        setColor(`${data.result.choices[0].text}`);
      }
    },
    [value, theme]
  );

  const handleButton = React.useCallback(async () => {
    setPrompt(value);
    localStorage.setItem("hex-hex", value);
    setIsStatus(false);
    setColor("...");
    console.log("send value " + value);
    console.log("send theme " + theme);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value, themeValue: theme }),
    });
    if (response) {
      setIsStatus(true);
      // console.log(isStatus);
    }
    const data = await response.json();
    setColor(`${data.result.choices[0].text}`);
  }, [value, theme]);

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
  }, [value]);

  const nodeRef = React.useRef(null);

  return (
    <Container>
      {/* TODO: specify the handle in Draggable Input since it breaks text highlighting now */}
      <Draggable nodeRef={nodeRef} disabled={true}>
        <Field ref={nodeRef}>
          <InputGroup>
            <Input
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              defaultValue={value}
            />
            <RadioGroup
              onOptionChange={handleChange}
              theme={theme}
              resetRadio={resetRadioState}
            />
          </InputGroup>
          <EnterGroup>
            <EnterButton onClick={handleButton} />
            <EnterHint />
          </EnterGroup>
        </Field>
      </Draggable>
      {color && (
        <>
          <Draggable nodeRef={nodeRef} disabled={true}>
            <ColorBlock blockColor={ColorBlockColor} ref={nodeRef}>
              <>
                <p>Let&apos;s call it</p>
                <div className="result">
                  <p className="result__text">{color.replace(/\./g, '')}</p>
                  {color != "..." ? (
                    <>
                      <CopyButton onClick={handleCopy} changeBy={isCopied} />
                    </>
                  ) : null}
                </div>
                {color ? (
                  <Button
                    onClick={handleClick}
                    isShown={value && isStatus == true ? "visible" : "hidden"}
                    buttonColor={ColorBlockColor}
                  >
                    {!color ? "Find" : "Find again"}
                  </Button>
                ) : null}
              </>
            </ColorBlock>
          </Draggable>
        </>
      )}
    </Container>
  );
};

export default HEXInput;

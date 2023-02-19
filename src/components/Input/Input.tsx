"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

var ColorBlockColor: string | null;

const ColorBlock = styled.div<{blockColor: string | null}>`
background: ${props => props.blockColor || "palevioletred"};
`;

const Button = styled.button`
.visible {
  visibility: visible;
}
.hidden {
  visibility: hidden;
}
`;

const HEXInput: React.FC = () => {
  const [value, setValue] = React.useState<string>(`${typeof window !== "undefined" && localStorage.getItem("hex-hex") ? localStorage.getItem("hex-hex") : ""}`);
  const [prompt, setPrompt] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");


  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      console.log(e.target.value);
    },
    []
  );

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setPrompt(value);
        localStorage.setItem("hex-hex", value);

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

      }
    },
    [value]
  );

  useEffect(() => {
    typeof window !== "undefined" 
      ? ColorBlockColor = localStorage.getItem("hex-hex")
      : ColorBlockColor = "transparent"
    });
     

  // const handleClick = useCallback(async () => {
  //   if (localStorage.getItem("hex-hex")) {
  //     //scenario 1 - value in local storage
  //     let value = localStorage.getItem("hex-hex");
  //     setPrompt(value);
  //     console.log("got " + value + " from local storage");
  //     setColor("Loading...");
  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: value }),
  //     });
  //     const data = await response.json();
  //     setColor(`${data.result.choices[0].text}`);
  //     // setColorBlock(value);
  //     //end scenario 1

  //     //scenario 2 - no local storage but value in input
  //   } else if (value && localStorage.getItem("hex-hex")) {
  //     localStorage.setItem("hex-hex", value);
  //     console.log('dealed with that shit');
  //   //scenario 2.5
  //   } else if (value) {
  //     localStorage.setItem("hex-hex", value);
  //     setPrompt(value);
  //     console.log(value);
  //     setColor("Loading...");
  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: value }),
  //     });
  //     const data = await response.json();
  //     setColor(`${data.result.choices[0].text}`);
  //     //end scenario 2
  //     //scenario 3 — input not filled
  //   } else {
  //     alert("no value");
  //   }
  // }, []);

  return (
    <>
      <div>
        <div>
          <input
            aria-label="Enter your HEX"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            // onBlur={setActive(!isActive)}
            type="text"
            name="description"
            // placeholder="Enter your color HEX"
            defaultValue={value}
            // value={value ? value : null}
          />
        </div>
        {/* {color ? 
        <Button onClick={handleClick}
        // className={isActive ? "visible" : "hidden"}
        >
          {!color ? "Find" : "Find again"}
        </Button>
          : null  
          } */}
        <div>
          {color && (
            <ColorBlock blockColor={ColorBlockColor}>
              <h2>Color Name:</h2>
              {color}
            </ColorBlock>
          )}
        </div>
      </div>
    </>
  );
};

export default HEXInput;

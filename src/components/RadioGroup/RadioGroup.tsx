import { ChangeEventHandler, ChangeEvent } from "react";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

interface RadioProps {
  onOptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  theme: string;
  resetRadio?: (e: any) => void;
}

const Group = styled.form`
  display: flex;
  flex-direction: row;
  gap: 12px;
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  align-items: center;
  width: 100%;
  justify-content: flex-start;

  @media screen and (max-width: 1023px) {
    flex-wrap: wrap;

    div:nth-child(1) {
      flex-basis: 100%;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 16px 0;
    gap: 8px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 8px;
  gap: 8px;
  background: #e6e6e6;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
`;

const Tab = styled.div`
  display: flex;

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + ${Label} {
    background-color: black;
    color: #fff;
  }
`;

const RadioGroup: React.FC<RadioProps> = ({
  onOptionChange,
  theme,
  resetRadio,
}) => {
  return (
    <Group>
      <div>Select theme:</div>
      <Tab>
        <input
          type="radio"
          value="alchemy and chemistry"
          checked={theme === "alchemy and chemistry"}
          onChange={onOptionChange}
          id="1"
          name="tabs"
        />
        <Label htmlFor="1">
          <span>&#129514;</span>Alchemy
        </Label>
      </Tab>
      <Tab>
        <input
          type="radio"
          value="famous musicians and bands"
          checked={theme === "famous musicians and bands"}
          onChange={onOptionChange}
          id="2"
          name="tabs"
        />
        <Label htmlFor="2">
          <span>👨‍🎤</span>Music
        </Label>
      </Tab>
      <Tab>
        <input
          type="radio"
          value="food"
          checked={theme === "food"}
          onChange={onOptionChange}
          id="3"
          name="tabs"
        />
        <Label htmlFor="3">
          <span>🥑</span>Food
        </Label>
      </Tab>
      <Tab>
        <input
          type="radio"
          value="famous artists and paintings"
          checked={theme === "famous artists and paintings"}
          onChange={onOptionChange}
          id="4"
          name="tabs"
        />
        <Label htmlFor="4">
          <span>🎨</span>Art
        </Label>
      </Tab>
      {/* <button type="reset" onClick={resetRadio}>
        reset
      </button> */}
    </Group>
  );
};

export default RadioGroup;

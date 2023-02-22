import { ChangeEventHandler, ChangeEvent } from "react";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

interface RadioProps {
  onOptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  theme: string;
}

const Group = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioGroup: React.FC<RadioProps> = ({ onOptionChange, theme }) => {
  return (
    <Group>
      <input
        type="radio"
        name="themeSelect"
        value="Alchemy"
        id="Alchemy"
        checked={theme === "Alchemy"}
        onChange={onOptionChange}
      />
      <label htmlFor="Alchemy">Alchemy</label>

      <input
        type="radio"
        name="themeSelect"
        value="Music"
        id="music"
        checked={theme === "Music"}
        onChange={onOptionChange}
      />
      <label htmlFor="Music">Music</label>

      {/* <input
        type="radio"
        name="themeSelect"
        value="Large"
        id="large"
        checked={theme === "Large"}
        onChange={onOptionChange}
      />
      <label htmlFor="large">Large</label> */}
    </Group>
  );
};

export default RadioGroup;

import React,{useContext} from "react";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import styled from "styled-components";
import { BiImport } from "react-icons/bi";
import { darkModePropType } from "./EditorContainer";
const Console = styled.div<darkModePropType>`       
  background: ${(props)=>props.bgmode?"#151515":"#EEEEEE"};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div<darkModePropType>`
  height: 4rem;
  background: ${(props)=>props.bgmode?"2D2424":"#EEEEEE"};
  color:${(props)=>props.bgmode?"white":"black"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  button {
    display: flex;
    color:${(props)=>props.bgmode?"white":"black"};
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    font-weight: 400;
    background:transparent;
    outline:0;
    border:0;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const TextArea = styled.textarea<darkModePropType>`
  flex-grow: 1;
  resize: none;
  color:${(props)=>props.bgmode?"white":"black"};
  background:${(props)=>props.bgmode?"#2C3333":"#F6E9E9"};   
  border: 0;
  outline: 0;
  font-size: 1.1rem;
  padding:0.25rem;
  padding-top:0.5rem;
`;
interface InputConsoleProps {
  currentInput: string;
  setCurrentInput: (newInput: string) => void;
}
const InputConsole: React.FC<InputConsoleProps> = ({
  currentInput,
  setCurrentInput,
}) => {
  const {mode}=useContext(PlaygroundContext)!;
  return (
    <Console bgmode={mode}>
      <Header bgmode={mode}>
        Input:
        <button>
          <BiImport />
          Import Input
        </button>
      </Header>
      <TextArea bgmode={mode}
      value={currentInput}
      onChange={(e) => {
        setCurrentInput(e.target.value);
      }}
      >
        
        
      </TextArea>
    </Console>
  );
};

export default InputConsole;
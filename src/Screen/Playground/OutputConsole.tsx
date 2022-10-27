
import styled from "styled-components";
import { BiExport } from "react-icons/bi";
import React,{useContext} from "react";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { darkModePropType } from "./EditorContainer";
const Console = styled.div<darkModePropType>`
  background: ${(props)=>props.bgmode?"#151515":"#EEEEEE"};;
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
    align-items: center;
    color:${(props)=>props.bgmode?"white":"black"};
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

const OutputArea = styled.textarea<darkModePropType>`
color:${(props)=>props.bgmode?"white":"black"};
background:${(props)=>props.bgmode?"#2C3333":"#F6E9E9"};  
  flex-grow: 1;
  padding:0.25rem;
  padding-top:0.5rem;

`;
interface OutputConsoleProps {
  currentOutput: string;
}
const OutputConsole : React.FC<OutputConsoleProps> = ({ currentOutput }) => {
  const {mode}=useContext(PlaygroundContext)!;
  return (
    <Console bgmode={mode}>
      <Header bgmode={mode}>
        Output:
        <button>
          <BiExport />
          Export Output
        </button>
      </Header>
      <OutputArea bgmode={mode} value={currentOutput} disabled></OutputArea>
    </Console>
  );
};

export default OutputConsole;
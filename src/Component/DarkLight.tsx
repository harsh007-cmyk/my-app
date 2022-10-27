import React,{useContext} from 'react'
import { PlaygroundContext } from '../context/PlaygroundContext';
import styled from 'styled-components'
const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: black;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: white;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      background: black;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;


function Toggle() {
const {mode,setMode}=useContext(PlaygroundContext)!;    
function handleCheckbox(){
    if(mode===true){
      setMode(false);
    }else{
      setMode(true);
    }    
}
return (
    <div>
    <CheckBoxWrapper>    
      <CheckBox onChange={handleCheckbox} id="checkbox" type="checkbox" checked={mode}/>
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  </div>
  )
}

export default Toggle
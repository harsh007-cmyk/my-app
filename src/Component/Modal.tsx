import styled from "styled-components";
import {RiCloseFill} from 'react-icons/ri';
import {useContext} from 'react';
import { ModalContext } from "../context/ModalContext";
import { isJsxOpeningElement } from "typescript";
import Loading from "./ModalTypes/Loading";
import { PlaygroundContext } from "../context/PlaygroundContext";
import EditCardTitle from "./ModalTypes/EditCardTitle";
import EditFolderTitle from "./ModalTypes/EditFolderTitle";
import NewCard from "./ModalTypes/NewCard";
import NewFolder from "./ModalTypes/NewFolder";
import NewFolderAndPlaygound from "./ModalTypes/NewFolderAndCard";
import { darkModePropType } from "../Screen/Playground/EditorContainer";
export interface ModalProps{
  closeModal:()=>void;
  identifier:{
    folderId:string;
    cardId:string;
  }
}
export const ModalContainer=styled.div<darkModePropType>`
  background:rgba(0 0 0 0.4);
  width:100%;
  height:100vh;
  position:fixed;
    top:0;
    left:0;
    z-index:2;
    display:flex;
    align-items:center;
    justify-content:center;
  `
  const ModalConent=styled.div<darkModePropType>`
  background:${(props)=>props.bgmode?'#0F0E0E':"#DCD7C9"};
  color:${(props)=>props.bgmode?"white":"black"};  
  width:35%;
  padding:2rem;
  border-radius:10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `
 export  const CloseButton=styled.button`
    background:transparent;
    outline:0;
    border:0;
    font-size:2rem;
    cursor:pointer;
  `
export const Header=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
export const Input=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 1.5rem 0;
gap: 2rem;
padding-bottom: 0;
input {
  flex-grow: 1;
  height: 2rem;
}
button {
  background: #241f21;
  height: 2rem;
  color: white;
  padding: 0 2rem;
}
`





function Modal() {
    const ModalFeatures=useContext(ModalContext)!;
    const {closeModal}=ModalFeatures;
    const isOpen=ModalFeatures.isOpen;
    const{mode}=useContext(PlaygroundContext)!;
  const handleClick=(e:any)=>{
    e.stopPropagation();
  }   

    return (
    <ModalContainer bgmode={mode} onClick={closeModal}>
        <ModalConent bgmode={mode} onClick={handleClick}>   
  {isOpen.type==='1'&& (<EditCardTitle closeModal={closeModal} identifier={isOpen.identifier}/>)}
  {isOpen.type==='2'&& (<EditFolderTitle closeModal={closeModal} identifier={isOpen.identifier}/>)}
  {isOpen.type==='3'&& (<NewCard closeModal={closeModal} identifier={isOpen.identifier}/>)}
  {isOpen.type==='4'&& (<NewFolder closeModal={closeModal} identifier={isOpen.identifier}/>)}
  {isOpen.type==='5'&& (<NewFolderAndPlaygound closeModal={closeModal} identifier={isOpen.identifier}/>)}
  {isOpen.type==='6'&&<Loading/>}
        </ModalConent>
    </ModalContainer>
  )
}

export default Modal
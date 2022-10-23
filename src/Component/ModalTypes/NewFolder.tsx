import React,{useState,useContext} from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { setSyntheticLeadingComments } from 'typescript';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps} from '../Modal';
function NewFolder({closeModal,identifier}:ModalProps) {
  const{folders,createNewFolder}=useContext(PlaygroundContext)!;
  const[title,setTitle]=useState("");
  return (
    <div>
      <Header>
        <h2>Create New Folder</h2>
        <CloseButton
          onClick={()=>{
            closeModal();
          }}
        >
          <RiCloseFill/>
        </CloseButton>
      </Header>
      <Input>
      <input
        type='text' value={title} onChange={(e)=>{
         setTitle(e.target.value);    
          
        }}
      />
      </Input>
      <button
        onClick={()=>{
          createNewFolder(title);        
          closeModal();
        }}
      >
        Create New Folder
      </button>
  </div>
  )
}

export default NewFolder
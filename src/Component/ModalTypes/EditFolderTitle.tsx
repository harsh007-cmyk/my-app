import React,{useState,useContext} from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalProps,Input,Header } from '../Modal'
import { PlaygroundContext } from '../../context/PlaygroundContext';
function EditFolderTitle({closeModal,identifier}:ModalProps) {
  const[title,setTitle]=useState("");
  const{folderId}=identifier;
  const{folders,editFolderTitle}=useContext(PlaygroundContext)!;
  return (    
    <div>
    <Header>
      <h2>Edit Folder Title</h2>
      <CloseButton
        onClick={() => {
          closeModal();
        }}
      >
        <RiCloseFill />
      </CloseButton>
    </Header>
    
    <Input>
      <input
        type='text'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={() => {
          editFolderTitle(folderId, title);
          closeModal();
        }}
      >
        Update Title
      </button>
    </Input>
  </div>
  )
}

export default EditFolderTitle
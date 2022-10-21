import React,{useState,useContext} from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { CloseButton, ModalProps,Header } from '../Modal';
function EditCardTitle({closeModal,identifier}:ModalProps){
  const {folderId,cardId}=identifier;
  const {folders}=useContext(PlaygroundContext)!;
  const [title,setTitle]=useState(
    folders[folderId].items[cardId].title as string
  );
  return (
    <div>
      <Header>
        <h2>Edit Card Title</h2>
      </Header>
        EditCard
         <CloseButton
        onClick={()=>{
          closeModal();
            
        }}
        >
        <RiCloseFill/>
        <input>
         input
        </input>
    </CloseButton>
    </div>
  )
}

export default EditCardTitle
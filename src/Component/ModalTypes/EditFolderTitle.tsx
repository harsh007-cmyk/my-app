import React,{useState,useContext} from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalProps,Input,Header } from '../Modal'
import { PlaygroundContext } from '../../context/PlaygroundContext';
function EditFolderTitle({closeModal,identifier}:ModalProps) {
  const[title,setTitle]=useState("");
  const{folderId,cardId}=identifier;
  const{folders,editFolderTitle}=useContext(PlaygroundContext)!;
  return (    
  <div>
    <Header>
    <CloseButton
   onClick={()=>{
     closeModal();
       
   }}
   >
   <RiCloseFill/>
   
</CloseButton>
</Header>
<Input>
   <Input>
    <input type='text' value={title} onChange={(e)=>{
      setTitle(e.target.value);
    }}/>
    <button onClick={()=>{
      editFolderTitle(folderId,title);
      closeModal();
    }}>

    </button>
   </Input>

</Input>
</div>
  )
}

export default EditFolderTitle
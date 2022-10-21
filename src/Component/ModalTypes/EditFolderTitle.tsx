import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalProps } from '../Modal'

function EditFolderTitle({closeModal,identifier}:ModalProps) {
  return (    <div>
    <CloseButton
   onClick={()=>{
     closeModal();
       
   }}
   >
   <RiCloseFill/>
</CloseButton>
</div>
  )
}

export default EditFolderTitle
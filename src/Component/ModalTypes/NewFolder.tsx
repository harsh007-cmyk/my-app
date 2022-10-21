import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalProps } from '../Modal'

function NewFolder({closeModal,identifier}:ModalProps) {
  return (
    <div>
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

export default NewFolder
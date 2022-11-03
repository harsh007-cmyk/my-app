import { createContext, useState } from "react";
interface PopupFields{
  value:boolean;
  type:string;
  identifier:{
    folderId:string;
    cardId:string;
  }
}
interface ModalContextType {
  isOpen: PopupFields;
  openModal:(value:PopupFields)=>void;
  closeModal:()=>void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: any }) {
  const initialPopupFields={
    value:false,
    type:'',
    identifier:{
      folderId:"",
      cardId:"",
    }
  }
  
  const [isOpen, setIsOpen] = useState<PopupFields>(initialPopupFields);   
  const openModal=(value:PopupFields)=>{
    setIsOpen(value);
  }
  const closeModal=()=>{
    setIsOpen({...initialPopupFields});
  }
  const MakeAvailableGlobally:ModalContextType={
    isOpen:isOpen,
    openModal:openModal,
    closeModal:closeModal,
  };
  return (
    <ModalContext.Provider value={MakeAvailableGlobally}>
      {children}
    </ModalContext.Provider>
  );
}
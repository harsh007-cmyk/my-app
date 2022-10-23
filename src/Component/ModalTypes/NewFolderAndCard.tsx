import React,{useState,useContext} from 'react';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps}from "../Modal";
import {RiCloseFill } from 'react-icons/ri';
import Select from 'react-select';
import styled from 'styled-components';
const InputAndSelect=styled.div`
display: grid;
grid-template-columns: 0.5fr 1fr;
row-gap: 1rem;
column-gap: 1rem;
margin-top: 1.2rem;
align-items: center;

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
`;

function NewFolderAndPlaygound({closeModal,identifier}:ModalProps){
    
    const langs=[
        { value: "c++", label: "C++" },
        { value: "java", label: "Java" },
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
    ]
    const{createNewFolderAndPlaygruond}=useContext(PlaygroundContext)!;
    const [folderTitle,setFolderTitle]=useState("");
    const[lang,setLang]=useState(langs[0]);
    const[cardTitle,setcardTitle]=useState("");

    function handleLang(selectedLang:any){
            setLang(selectedLang)
    }
    return(
        <div>
            <Header>
                <h2>Create New Folder And Playground</h2>
                <CloseButton onClick={()=>{
                    closeModal();
                }}>
                    <RiCloseFill/>

                </CloseButton>

            </Header>
        
        <InputAndSelect>
                <label>Folder Name</label>
                <input type="text" value={folderTitle} onChange={(e)=>{
                    setFolderTitle(e.target.value);
                }} />
                <label>Playground Name</label>
                <input type="text" value={cardTitle} onChange={(e)=>{
                    setcardTitle(e.target.value)
                }} />
                <Select options={langs} value={lang} onChange={handleLang}/>
                <button onClick={()=>{
                    createNewFolderAndPlaygruond(
                        folderTitle,
                        cardTitle,
                        lang.value
                    )
                    closeModal();
                }}>
                        Create
                </button>
        </InputAndSelect>
        </div>
    )

}
export default NewFolderAndPlaygound;
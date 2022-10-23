import React,{useContext} from 'react'
import EditorContainer from './EditorContainer'
import Navbar from './Navbar'
import OutputConsole from './OutputConsole'
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import InputConsole from './InputConsole';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { Console } from 'console';
import Modal from '../../Component/Modal';
import { ModalContext } from '../../context/ModalContext';
const MainApp=styled.div`
  display:grid;
  grid-template-columns:2fr 1fr;
  height:calc(100vh-4.5rem)
`
const Consoles=styled.div`
  display:grid;
  grid-template-columns:1fr;
  grid-template-rows:1fr 1fr;

`

function Playground() {
  const {isOpen} =useContext(ModalContext)!;
  const { folderId, playgroundId } = useParams();


  const { folders } = useContext(PlaygroundContext)!;
  const { title, language,code } =folders[folderId as string].items[playgroundId as string];
  

  console.log("folders",language);
  return (
    <div>
      <Navbar/>
    <MainApp>
    <EditorContainer title={title} language={language} code={code} folderId={folderId as string} cardId={playgroundId as string}/>
      
        <Consoles>
        <InputConsole/>
        <OutputConsole/>
        </Consoles>
    </MainApp>
    {isOpen.value === true ? <Modal /> : <></>}
    </div>

    
  )
}

export default Playground
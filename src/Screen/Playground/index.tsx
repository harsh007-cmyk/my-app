import React,{useContext} from 'react'
import EditorContainer from './EditorContainer'
import Navbar from './Navbar'
import OutputConsole from './OutputConsole'
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import InputConsole from './InputConsole';
import { PlaygroundContext } from '../../context/PlaygroundContext';
const MainApp=styled.div`
  display:grid;
  grid-template:2fr 1fr;
`

function Playground() {
  const { folderId, playgroundId } = useParams();

  const { folders } = useContext(PlaygroundContext)!;
  const { title, language } =folders[folderId as string].items[playgroundId as string];
  
  
  console.log("folders",folders);
  return (
    <div>
      <Navbar/>
    <div>
    <EditorContainer/>
      <div>
        <InputConsole/>
        <OutputConsole/>
      </div>
    </div>
    </div>

    
  )
}

export default Playground
import React,{useContext,useState} from 'react'
import EditorContainer from './EditorContainer'
import Navbar from './Navbar'
import OutputConsole from './OutputConsole'
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import InputConsole from './InputConsole';
import Modal from '../../Component/Modal';
import { ModalContext } from '../../context/ModalContext';
import { languageMap,PlaygroundContext } from '../../context/PlaygroundContext';
import { Buffer } from 'buffer';
import axios from 'axios'
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
  const {isOpen, openModal, closeModal} =useContext(ModalContext)!;
  const { folderId, playgroundId } = useParams();


  const { folders ,savePlayground} = useContext(PlaygroundContext)!;
  const { title, language,code } =folders[folderId as string].items[playgroundId as string];
  

  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentOutput, setCurrentOutput] = useState("");

  const saveCode = () => {
    savePlayground(
      folderId as string,
      playgroundId as string,
      currentCode,
      currentLanguage
    );
  };
  const encode = (str: string) => {
    return Buffer.from(str, "binary").toString("base64");
  };
  const decode = (str: string) => {
     return Buffer.from(str, "base64").toString();
  };
  const postSubmission=async(
    language_id:number,
    source_code:string,
    stdin:string,
  )=>{
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '6bce00dbb1msh91db6dedceb0875p127b8ajsn72dae2c312e5',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({
        language_id:language_id,
        source_code:source_code,
        stdin:stdin
      })
    };
    const result=await axios.request(options);
    console.log(result);
    return result.data.token;
  }

  const getOutput: (token: string) => any = async (token: string) => {
    
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/'+token,
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        'X-RapidAPI-Key': '6bce00dbb1msh91db6dedceb0875p127b8ajsn72dae2c312e5',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    console.log("posting");
    const response = await axios.request(options);
    console.log(response,"response getting");
    if (response.data.status_id <= 2) {
      const response2 = await getOutput(token);
      return response2.data;
    }
    return response.data;
  };
  
  const runCode = async () => {
    openModal({
      value: true,
      type: "6",
      identifier:{
        folderId:"",
        cardId:"",
      }
    });
    console.log(languageMap);
    
    console.log(currentLanguage, languageMap[currentLanguage]);
    
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);
    const token = await postSubmission(language_id, source_code, stdin);
    console.log(token);
    
    const res = await getOutput(token);
    console.log("Output",res);
    const status_name = res.status.description;
    const decoded_output = decode(res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    const decoded_stderr = decode(res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      if (decoded_compile_output === "") {
        final_output = decoded_stderr;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }
    console.log(final_output);
    
    setCurrentOutput(status_name + "\n\n" + final_output);
    closeModal();
  };
  return (
    <div>
      <Navbar/>
    <MainApp>
    <EditorContainer title={title} 
    currentLanguage={currentLanguage}  
    currentCode={currentCode} 
    setCurrentCode={setCurrentCode} 
    setCurrentLanguage={setCurrentLanguage}
    folderId={folderId as string}
    
    cardId={playgroundId as string}
    saveCode={saveCode}
    runCode={runCode}
    />
      
        <Consoles>
        <InputConsole
         currentInput={currentInput}
         setCurrentInput={setCurrentInput}
        />
        <OutputConsole currentOutput={currentOutput}/>
        </Consoles>
    </MainApp>
    {isOpen.value === true ? <Modal /> : <></>}
    </div>

    
  )
}

export default Playground
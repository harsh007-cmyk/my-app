import React,{useState,useContext,useCallback} from 'react'
import styled from 'styled-components'
import CodeEditior from './CodeEditior';
import { BiEditAlt, BiExport, BiImport } from "react-icons/bi";
import { AiOutlineFullscreen } from "react-icons/ai";
import Select from 'react-select';
import { ModalContext } from '../../context/ModalContext';
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext';
import {FullScreen,useFullScreenHandle} from "react-full-screen";
import Toggle from '../../Component/DarkLight';
export interface darkModePropType{
  readonly bgmode:boolean
}

const StyledEditorContainer=styled.div<darkModePropType>`
   
    display:flex;
    flex-direction:column;
`
const UpperToolbar=styled.div<darkModePropType>`
    background:${(props)=>{
      if(props.bgmode){
        return '#151515'; 
      }else{
        return "#EEEEE";
      }
    }};
    color:${(props)=>{
      if(props.bgmode){
        return "white"
      }else{
        return "black"
      }
    }};
    height:4rem;   
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 2 rem;
`
const Title=styled.div<darkModePropType>`
    dipslay:flex;
    align-items:center;
    gap:1rem;
    margin-left:1rem;
    h3{
        font-size:1.3rem;
    }
    button{
        background:transparent:        
        font-size:1.3rem;
        width:2rem;
    }

`
const LowerToolbar = styled.div<darkModePropType>`
  background:${(props)=>props.bgmode?"#151515":"#EEEEEE"};
  height: 4rem;
  color:${(props)=>props.bgmode?"white":"black"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  button,label {
    outline: 0;
    border: 0;
    font-size: 1.15rem;
    curson:pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      font-size: 1.4rem;
    }
  }

`
const ButtonGroup=styled.div<darkModePropType>`
    display:flex;
    align-items:center;
    gap:2.5rem;
`
const RunCode=styled.button<darkModePropType>`
      padding: 0.8rem 1rem;
  background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
  color: white;
  font-weight: 700;
  border-radius: 2rem;
  border: 0;
`
const SelectBars=styled.div<darkModePropType>`
display: flex;
align-items: center;    
gap: 3rem;
margin-right:5rem;
& > div:nth-of-type(1) {
  width: 10rem;
}

& > div:nth-of-type(2) {
  width: 11rem;
}
`
const SaveCode = styled.button<darkModePropType>`
  padding: 0.4rem 1rem;
  background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
  color: white;
  font-weight: 700;
  border-radius: 2rem;
  border: 0;
`;
interface EditorContainerProps{
    title:string
    currentLanguage: string;
    currentCode: string;
    setCurrentLanguage: (newLang: string) => void;
    setCurrentCode: (newCode: string) => void;
    folderId:string;
    cardId:string;
    saveCode: () => void;
     runCode: () => void;
  }
  
const EditorContainer:React.FC<EditorContainerProps>=({title,
    currentLanguage,
    currentCode,
    setCurrentLanguage,
    setCurrentCode,
    saveCode,
    runCode,
    folderId,cardId})=> {
    const langOpts=[
        {value:'c++',label:'C++'},
        {value:'java',label:'Java'},
        {value:'python',label:'Python'},
        {value:'javascript',label:'JavaScript'}   
    ]
    const themeOpts = [
        { value: "duotoneLight", label: "duotoneLight" },
        { value: "duotoneDark", label: "duotoneDark" },
        { value: "xcodeLight", label: "xcodeLight" },
        { value: "xcodeDark", label: "xcodeDark" },
        { value: "okaidia", label: "okaidia" },
        { value: "githubDark", label: "githubDark" },
        { value: "githubLight", label: "githubLight" },
        { value: "bespin", label: "bespin" },
      ];
      console.log("hellwo",currentLanguage);
    
    
    const [selectedLanguage,setselectedLnaguage]=useState(()=>{
        for(let i=0;i<langOpts.length;i++){
            if(langOpts[i].value===currentLanguage){
                return langOpts[i];
            }
        }
        
        return langOpts[0];
    });
    console.log("selectee",selectedLanguage);
    
    const [selectedTheme,setselectedTheme]=useState({
        value:"githubDark",
        label:"githubDark"
});
    
const {openModal}=useContext(ModalContext)!;
      
      const handleLanguageOpts=(selectedOptions:any)=>{
                setselectedLnaguage(selectedOptions);
                setCurrentLanguage(selectedOptions.value);
                setCurrentCode(languageMap[selectedOptions.value].defaultCode);
      }
      const handleThemeOpts=(selectedOption:any)=>{
        setselectedTheme(selectedOption);
      }

      const getFile=(e:any)=>{
        const input=e.target;
        if("files" in input &&input.files.length>0){
            placeFileContent(input.files[0]);
        }
      }
      const placeFileContent = (file: any) => {
        readFileContent(file)
          .then((content) => {
            setCurrentCode(content as string);
          })
          .catch((error) => console.log(error));
      };
      function readFileContent(file: any) {
        const reader = new FileReader();
        console.log("reader",reader);
        return new Promise((resolve, reject) => {
          reader.onload = (event) => resolve(event!.target!.result);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
      }
      const fullScreenHandle=useFullScreenHandle();
     const {mode}=useContext(PlaygroundContext)!;
    
     const customStyles = {
      option: (provided:any, state:any) => ({
        ...provided,
        backgroundColor:mode?state.isSelected?"black":"grey":state.isSelected?"#A9BA9D":"white",
        
        "&:hover":{
          backgroundColor:mode?state.isSelected?"":"#484848":state.isSelected?"":"grey",

        }
      }),
      control: (provided:any) => ({
        ...provided,
        marginTop: "5%",
        color:"red",
        backgroundColor:mode?"grey":"white",
          
        "&:hover":{
          backgroundColor:'white',   
        }
      })
    }
    const makeExport=()=>{
      const Data=JSON.stringify(currentCode);
      const blob=new Blob([Data],{type:"text/plain"});       
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.download="user-code.txt";
      link.href=url;
      link.click();
    }
  return (
    <StyledEditorContainer bgmode={mode}>
        <UpperToolbar bgmode={mode}>
            <Title bgmode={mode}>
                <h3>{title}</h3>
                <button onClick={()=>{
                    openModal({
                        value:true,
                        type:"1",
                        identifier:{
                            folderId:folderId,
                            cardId:cardId
                        }
                    })
                }}>
                    <BiEditAlt/>
                </button>
            </Title>
            <SelectBars bgmode={mode}>
            <SaveCode bgmode={mode}
                onClick={()=>{
                    saveCode();
                }}
            >Save Code</SaveCode>
                <Select styles={customStyles} value={selectedLanguage} onChange={handleLanguageOpts} options={langOpts}/>
                <Select styles={customStyles} value={selectedTheme}  onChange={handleThemeOpts} options={themeOpts}/>
                
            </SelectBars>
            
        </UpperToolbar>
        <FullScreen handle={fullScreenHandle}>
        <CodeEditior
            currentLanguage={selectedLanguage.value}
            currentTheme={selectedTheme.value}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            fullScreenHandle={fullScreenHandle}
        />
        </FullScreen>
            <LowerToolbar bgmode={mode}>
                <ButtonGroup bgmode={mode}>
            <button onClick={fullScreenHandle.enter}
              >
            <AiOutlineFullscreen/>
            
          </button>
          <Toggle/>
          <label onClick={makeExport}>
          <BiExport/> export
          </label>
            
          <label>
            <input type='file' accept='.txt' style={{ display: "none" }}
              onChange={(e) => {
                getFile(e);
              }}
            />
            <BiImport /> Import Code
          </label>
          

             </ButtonGroup>
                    <RunCode bgmode={mode}
                        onClick={()=>{
                            runCode();

                        }}
                    >Run Code</RunCode>
            </LowerToolbar>

    </StyledEditorContainer>
  )
}

export default EditorContainer
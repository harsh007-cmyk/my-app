import React,{useState} from 'react'
import styled from 'styled-components'
import CodeEditior from './CodeEditior';
import { BiEditAlt, BiExport, BiImport } from "react-icons/bi";
import { AiOutlineFullscreen } from "react-icons/ai";
import Select from 'react-select';
const StyledEditorContainer=styled.div`
    display:flex;
    flex-direction:column;
`
const UpperToolbar=styled.div`
    background:white;
    height:4rem;    

    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 2 rem;
`
const Title=styled.div`
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
const LowerToolbar = styled.div`
  background: white;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  button {
    background: transparent;
    outline: 0;
    border: 0;
    font-size: 1.15rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      font-size: 1.4rem;
    }
  }

`
const ButtonGroup=styled.div`
    display:flex;
    align-items:center;
    gap:2.5rem;
`
const RunCode=styled.button`
    padding:0.8rem 2rem;
    background-color:#0097d7 !important;
    color:white;
    font-weight:700;
    border-radius:2rem;
`
const SelectBars=styled.div`
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
function EditorContainer() {
    const [selectedLnaguage,setselectedLnaguage]=useState(null);
    const [selectedTheme,setselectedTheme]=useState(null);
    const langOpts=[
        {value:'c++',label:'C++'},
        {value:'Java',label:'Java'},
        {value:'python',label:'Python'},
        {value:'javaScript',label:'JavaScript'}
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
      const handleLanguageOpts=(selectedOptions:any)=>{
                setselectedLnaguage(selectedOptions);
      }
      const handleThemeOpts=(selectedOption:any)=>{
        setselectedTheme(selectedOption);
      }
  return (
    <StyledEditorContainer>
        <UpperToolbar>
            <Title>
                <h3>Stack Implementaion</h3>
                <button>
                    <BiEditAlt/>
                </button>
            </Title>
            <SelectBars>
                <Select value={selectedLnaguage} onChange={handleLanguageOpts} options={langOpts}/>
                <Select value={selectedTheme}  onChange={handleThemeOpts} options={themeOpts}/>
                
            </SelectBars>
        </UpperToolbar>
        <CodeEditior/>
            <LowerToolbar>
                
                    <button>
                        <AiOutlineFullscreen/>
                        
                    </button>
                    <button>
                        <BiImport/>
                        
                    </button>
                    <button>
                        <BiExport/>
                        
                    </button>
                
                <button>Run Code</button>
            </LowerToolbar>

    </StyledEditorContainer>
  )
}

export default EditorContainer
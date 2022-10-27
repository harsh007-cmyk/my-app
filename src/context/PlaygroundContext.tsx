import { createContext, useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';



interface PlaygroundContextType{
    folders:any;
    bgColor:string;
    setBgColor:(bgcolor:string)=>void
    setFolders:any;
    createNewFolder:(folderTitle:string)=>void;
    createNewPlaygound:(folderId:string,
      cardTitle:string,
      cardLanguage:string)=>void;
    createNewFolderAndPlaygruond:(  
      folderTitle:string,
      cardTitle:string,
      cardLanguage:string,
    )=>void;
    editCardTitle:(
      folderId:string,
    cardId:string,
    newCardTitle:string
    )=>void;
    editFolderTitle:(folderId:string,newFolderTitle:string)=>void;
    deleteCard:(folderId:string,cardId:string)=>void;
    deletefolder:(folderId:string)=>void;
    savePlayground:(folderId:string,cardId:string,newCode:string,newLanguage:string
    )=>void;
    mode:boolean;
    setMode:(mode:boolean)=>void;
    customStyles:any;

  }


export const PlaygroundContext = createContext< PlaygroundContextType| null>(null);
export interface FolderT {
  title: string;
  items: {
    [key: string]: {
      title: string;
      language: string;
    };
  };
}

export interface FolderType {
  [key: string]: FolderT;
}
export const languageMap: {
  [key: string]: {
    defaultCode: string;
    id:number;
  };
} = {
  "c++": {
    id:54,
    defaultCode:
      "# include <iostream>\n" +
      "\n" +
      "int main() {\n" +
      "    // your code here\n" +
      "    return 0;\n" +
      "}",
  },
  'python': {
    id:71,
    defaultCode: "# your python code here",
  },
  'javascript': {
    id:63,
    defaultCode: "// your javascript code here",
  },
  'java': {
    id:62,
    defaultCode: `
    import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\npublic class Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t//your code here\n\t}\n}`,
  },
};
const initialData={
  [uuid()]:{
    title:"Folder Title 1",
    items:{
      [uuid()]:{
        title:"Stack Implemenation",
        language:"c++",
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
        title:"Queue Implemenation",
        language:"c++",
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
        title:"XYZ Implemenation",
        language:"c++",
        code: languageMap["c++"].defaultCode,
      },
      
    }
  },
  [uuid()]:{
    title:"Folder Title 2",
    items:{
      [uuid()]:{
          title:"1 implementation",
          language:'c++',
          
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
          title:"2 implementation",
          language:'c++',
          code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
          title:"3 implementation",
          language:'c++',
          code: languageMap["c++"].defaultCode,
      },
    }
  }
}

export default function PlaygroundProvider({ children }: { children: any }) {
  console.log("HARSHP")
 console.log("children",children);
 const [mode,setMode]=useState(false);
 const[bgColor,setBgColor]=useState("Ligher");
  const [folders,setFolders]=useState(()=>{
    let localData=JSON.parse(localStorage.getItem("playground-data") as string);
    localData=localData===undefined||localData===null||
    Object.keys(localData).length===0?null:localData;
    return localData||initialData;    
  })  
  
 
useEffect(()=>{
  
  
  localStorage.setItem("playground-data",JSON.stringify(folders));
  
},[folders])

  const createNewFolder=(folderTitle:string)=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      newState[uuid()]={
        title:folderTitle,
        items:{},
      };
      return newState;
    })
  } 
  const createNewPlaygound=(
    folderId:string,
    cardTitle:string,
    cardLanguage:string
  )=>{
    setFolders((oldState:any)=>{
      const newState={
        ...oldState
      };
      newState[folderId].items[uuid()]={
        title:cardTitle,
        language:cardLanguage,
        code:languageMap[cardLanguage].defaultCode,
      };
      return newState;
    })
  }
  
  const createNewFolderAndPlaygruond=(
    folderTitle:string,
    cardTitle:string,
    cardLanguage:string,
  )=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      newState[uuid()]={
        title:folderTitle,
        items:{
          [uuid()]:{
            title:cardTitle,
            language:cardLanguage,
            code:languageMap[cardLanguage].defaultCode,
          }
        }
      }
      return newState;
    })
  }
  const editCardTitle=(
    folderId:string,
    cardId:string,
    newCardTitle:string
  )=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      newState[folderId].items[cardId].title=newCardTitle;
      return newState;
    })
  }
  const editFolderTitle=(folderId:string,newFolderTitle:string)=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      newState[folderId].title=newFolderTitle;
      return newState;  
    })
  }
  const deleteCard=(folderId:string,cardId:string)=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      delete newState[folderId].items[cardId];
      return newState;
    })
  }

  const deletefolder=(folderId:string)=>{
    setFolders((oldState:any)=>{
      const newState={...oldState};
      delete newState[folderId];
      return newState;
    })
  }
  const savePlayground = (
    folderId: string,
    cardId: string,
    newCode: string,
    newLanguage: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      newState[folderId].items[cardId].code = newCode;
      newState[folderId].items[cardId].language = newLanguage;
      return newState;
    });
  };
  const Changebg=(bgColor:string)=>{
      if(bgColor==="Ligher"){
        setBgColor("Darker");
      }else{
        setBgColor("Lighter");
      }
  }
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
  const makeAvailableGlobally:PlaygroundContextType={
    folders:folders,
    bgColor:bgColor,
    setBgColor:Changebg,
    setFolders:setFolders,
    createNewFolder:createNewFolder,
    createNewPlaygound:createNewPlaygound,
    createNewFolderAndPlaygruond:createNewFolderAndPlaygruond,
    editCardTitle:editCardTitle,
    editFolderTitle:editFolderTitle,
    deleteCard:deleteCard,
    deletefolder:deletefolder,
    savePlayground:savePlayground,
    mode:mode,
    setMode:setMode,
    customStyles:customStyles,
  }
  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
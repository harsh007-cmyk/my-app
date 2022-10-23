import { createContext, useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';



interface PlaygroundContextType{
    folders:any;
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
const languageMap: {
  [key: string]: {
    defaultCode: string;
  };
} = {
  "c++": {
    defaultCode:
      "# include <iostream>\n" +
      "\n" +
      "int main() {\n" +
      "    // your code here\n" +
      "    return 0;\n" +
      "}",
  },
  python: {
    defaultCode: "# your python code here",
  },
  javascript: {
    defaultCode: "// your javascript code here",
  },
  java: {
    defaultCode: `import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\npublic class Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t//your code here\n\t}\n}`,
  },
};
const initialData={
  [uuid()]:{
    title:"Folder Title 1",
    items:{
      [uuid()]:{
        title:"Stack Implemenation",
        language:"C++",
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
        title:"Queue Implemenation",
        language:"C++",
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
        title:"XYZ Implemenation",
        language:"C++",
        code: languageMap["c++"].defaultCode,
      },
      
    }
  },
  [uuid()]:{
    title:"Folder Title 2",
    items:{
      [uuid()]:{
          title:"1 implementation",
          language:'C++',
          
        code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
          title:"2 implementation",
          language:'C++',
          code: languageMap["c++"].defaultCode,
      },
      [uuid()]:{
          title:"3 implementation",
          language:'C++',
          code: languageMap["c++"].defaultCode,
      },
    }
  }
}

export default function PlaygroundProvider({ children }: { children: any }) {
 console.log("children",children);
 
  const [folders,setFolders]=useState(()=>{
    let localData=JSON.parse(localStorage.getItem("playground-data") as string);
    console.log(console.log("local DAta",localData));
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
  const makeAvailableGlobally:PlaygroundContextType={
    folders:folders,
    setFolders:setFolders,
    createNewFolder:createNewFolder,
    createNewPlaygound:createNewPlaygound,
    createNewFolderAndPlaygruond:createNewFolderAndPlaygruond,
    editCardTitle:editCardTitle,
    editFolderTitle:editFolderTitle,
    deleteCard:deleteCard,
    deletefolder:deletefolder,
  }
  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
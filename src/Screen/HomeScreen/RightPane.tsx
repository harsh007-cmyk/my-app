import React, { useContext } from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import {ModalContext} from '../../context/ModalContext';
import { PlaygroundContext } from "../../context/PlaygroundContext";
import Toggle from "../../Component/DarkLight";
import { useNavigate } from "react-router-dom";
interface RightPaneProps{
  readonly bgmode:boolean;
}
interface HeaderProps {
  readonly variant: string;
  readonly bgmode:boolean;
}

interface HeadingProps {
  readonly size: string;
}

const StyledRightPane = styled.div<RightPaneProps>`
  padding: 2rem;
  background:${(props)=>props.bgmode?"#182747":"#D8D8D8"};
  color:${(props)=>props.bgmode?"#EEEEEE":"#0F0E0E"};
  position:absolute;
  right:0;
  rop:0;
  width:60%;
  min-height:100vh;
`;

const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background:${(props)=>props.bgmode?"#182747":"#D8D8D8"};
  margin-bottom: ${(props) =>
    props.variant === "main" ? "2.75rem" : "1.4rem"};
  &::after {
    position: absolute;
    content: "";
    bottom: -1.25rem;
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.25);
    display: ${(props) => (props.variant === "main" ? "block" : "none")};
  }
`;

const Heading = styled.h3<HeadingProps>`
  font-weight: 400;
  font-size: ${(props) => (props.size === "large" ? "1.8rem" : "1.5rem")};
  span {
    font-weight: 700;
  }
`;

const AddButton = styled.button<RightPaneProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  color:${(props)=>props.bgmode?"#EEEEEE":"black"};
  outline: 0;
  border: 0;
  font-size: 1.1rem;
  cursor: pointer;
  span {
    font-size: 1.75rem;
    font-weight: 700;
  }
  transition: all 0.25s ease;
  &:hover {
    opacity: 0.75;
  }
`;

const Folder = styled.div`
  margin-top: 0.5rem;
  margin-bottom:2rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const PlaygroundCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  gap: 1rem;
  box-shadow: 0px 0px 12px -3px rgba(0, 0, 0, 0.35);
  cursor:pointer;
  transition:all 0.1s ease;
  &hover{
    opacity:0.1;
  }
`;

const SmallLogo = styled.img`
  width: 75px;
`;

const CardContent = styled.div`
  flex-grow: 1;
  h5 {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;
`;
const FolderButtons=styled.div`
  display:flex;
  align-items:center;
`
const RightPane = () => {
  const navigate=useNavigate();
  const{mode}=useContext(PlaygroundContext)!; 
  const MakeAvailableGlobally=useContext(ModalContext)!;
  const {openModal}=MakeAvailableGlobally;
 const PlaygroundFeatures=useContext(PlaygroundContext)!;
 const{folders}=PlaygroundFeatures;
 const {deletefolder,deleteCard}=PlaygroundFeatures;
  return (
    <StyledRightPane bgmode={mode}>
      <Header variant='main' bgmode={mode}>
        <Heading size='large'>
          My <span>Playground</span>
        </Heading>
        <Toggle/>
        <AddButton bgmode={mode}
        onClick={()=>{
          openModal({
            value:true,
          type:"4",
          identifier:{
            folderId:"",
            cardId:"",
          }
          })
        }}>
          <span>+</span> New Folder
        </AddButton>
      </Header>
      {Object.entries(folders).map(([folderId,folder]:[folderId:string,folder:any])=>{
        return (
          <Folder>
          <Header variant='folder' bgmode={mode}>
            <Heading size='small'>{folder.title}</Heading>
            <FolderButtons>
              <Icons>
                <IoTrashOutline onClick={()=>{
                  deletefolder(folderId);
                }}/>
                <BiEditAlt onClick={()=>{
                  openModal({
                    value:true,
                    type:"2",
                    identifier:{
                      folderId:folderId,
                     cardId:"",

                    }
                  })
                }}/>
              </Icons>
            </FolderButtons>
            <AddButton bgmode={mode}
            onClick={()=>
              openModal({
                value:true,
                type:"3",
                identifier:{
                  folderId:folderId,
                  cardId:"",
                }
              })
            }
              
              >
              <span>+</span> New Playground
            </AddButton>
          </Header>
  
          <CardContainer>
            {Object.entries(folder.items).map(([cardId,card]:[cardId:string,card:any])=>(
                  <PlaygroundCard  onClick={()=>{
                    navigate(`/code/${folderId}/${cardId}`)
                  }}>
                  <SmallLogo src='/logo-small.png' alt='' />
                  <CardContent>
                    <h5>{card.title}</h5>
                    <p>Language: {card.language}</p>
                  </CardContent>
                  <Icons onClick={(e)=>{
                    e.stopPropagation();
                  }}>
                    <IoTrashOutline onClick={()=>{
                          deleteCard(folderId,cardId)
                    }}/>
                    <BiEditAlt
                      onClick={() => {
                        openModal({
                          value:true,
                          type:"1",
                          identifier:{
                            folderId:folderId,
                            cardId:cardId,
                          }
                        })
                      }}
                    />
                  </Icons>
                </PlaygroundCard>
                
      ))}
          
          </CardContainer>
        </Folder>
        )
      })}


      
    </StyledRightPane>
  );
};
export default RightPane
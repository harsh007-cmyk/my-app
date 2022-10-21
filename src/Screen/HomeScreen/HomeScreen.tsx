import React,{useContext} from 'react'
import LeftPane from './LeftPane'
import RightPane from './RightPane'
import styled from 'styled-components'
import Modal from '../../Component/Modal'
import { ModalContext } from '../../context/ModalContext'
const HomeScreencontainer=styled.div
`
position: relative;
width: 100%;
height: 100vh;
`

function HomeScreen() {
  const ModalFetures=useContext(ModalContext);
  let  isOpen=ModalFetures?.isOpen;
  return (
    <div>
        <HomeScreencontainer>
        <LeftPane/>    
        <RightPane/>
        {isOpen?.value===true?<Modal/>:<></>}
        </HomeScreencontainer>
    </div>
  )
}

export default HomeScreen
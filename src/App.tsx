import React from 'react';
import GlobalStyles from './Styles/global'
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import ModalProvider from './context/ModalContext';
import PlaygroundProvider from './context/PlaygroundContext';
import Playground from './Screen/Playground';
import Page404 from './Screen/page404/Index';
import {Route,Routes,Navigate,BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <div>
      <PlaygroundProvider>
      <ModalProvider>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        
        <Route path='/code/:folderId/:playgroundId' element={<Playground/>}/>
        <Route path="*" element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
      </ModalProvider>
      </PlaygroundProvider>
    </div>
  );
}

export default App;

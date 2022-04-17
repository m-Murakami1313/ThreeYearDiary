import React  from 'react'
import Home from './pages/Home'
import { EditPage } from './pages/EditPage';
import { CreatePage } from './pages/CreatePage';
import {Routes,BrowserRouter,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />}/>
      <Route path="/editpage" element={<EditPage/>}/>
      <Route path="/createpage" element={<CreatePage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
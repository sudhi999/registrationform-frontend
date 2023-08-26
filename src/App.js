import RegistationFrom from './RegistationFrom';
import { ToastContainer } from 'react-toastify';
import Data from './Data';
import './App.css';
import { useState } from 'react';

function App() {
  const [render,setrender] = useState(false)
  const handleRender = (render) =>{
    setrender(!render)
  }
  
  return (
    <div className='bg-gradient-to-br from-[#FFDEF2] to-[#E6F0FF]'>
      <ToastContainer/>
      <RegistationFrom handlerend={handleRender} rend={render} />
      <div className='p-8'>
        <Data handlerend={handleRender} rend={render}/>
      </div>
    </div>
  );
}

export default App;

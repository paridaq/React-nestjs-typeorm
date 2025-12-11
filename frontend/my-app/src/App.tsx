
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Register from './Register'
import Login from './Login'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path= '/login' element = {<Login/>}/>
    </Routes>
    
    </>
  )
}

export default App

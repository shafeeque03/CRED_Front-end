import React from 'react';
import SideBar from './components/SideBar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserPage from './Pages/UserPage';
import ProductPage from './Pages/ProductPage';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<UserPage/>}/>
        <Route path="/product" element={<ProductPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
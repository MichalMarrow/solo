import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddVitals from './AddVitals';
import UpdateVital from './UpdateVital';
import Vitals from './Vitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/vitals' element={<Vitals />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/create' element={<AddVitals />}></Route>
          <Route path='/update/:id' element={<UpdateVital />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

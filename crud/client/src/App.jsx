import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateVital';
import Vitals from './Vitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/vitals' element={<Vitals />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update/:id' element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

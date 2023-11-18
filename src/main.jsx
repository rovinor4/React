import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import App from './App';
import Main from './components/Navbar';
import Consultation from './Consultasion';
import Vaccinations from './Vaccinations';
import VacIndex from './Vaccinations/Index';
import VacSpot from './Vaccinations/Spot';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Main />}>
          <Route index element={<App />} />
          <Route path='/consultation' element={<Consultation />} />

          <Route path='/vaccinations' element={<Vaccinations />} >
            <Route path=':name' element={<VacIndex />} />
            <Route path=':name/:spotId' element={<VacSpot />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

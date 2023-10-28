import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Knjige from './components/knjiga/knjige.component';
import DodajKnjiga from './components/knjiga/dodajKnjigu.component';
import PromjeniKnjiga from './components/knjiga/promjeniKnjigu.component';


export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/knjige' element={<Knjige />} />
        <Route path='/knjige/dodaj' element={<DodajKnjiga />} />
        <Route path='/knjige/:sifra' element={<PromjeniKnjiga />} />
      </Routes>
     
    </Router>
  );
}

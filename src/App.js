import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChooseState from './ChooseState/index.js';
import ChooseCounty from './ChooseCounty/index.js';
import ShowInfo from "./ShowInfo/index.js";

import './assets/reset.css'
import './assets/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<ChooseState/>}/>
        <Route path={'/county'} element={<ChooseCounty/>}/>
        <Route path={'/info'} element={<ShowInfo/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Dashboard from "./components/Dashboard/Dashboard"
import HomePage from "./components/HomePage/HomePage";
import Editor from './components/Editor/Editor'

import {v4 as uuid} from 'uuid'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/docs/dashboard' element={<Dashboard />} />
            <Route path='/docs/new' element={<Navigate replace to={`/docs/${uuid()}`} /> } />
            <Route path='/docs/:id' element={<Editor />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

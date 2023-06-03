import { BrowserRouter, Routes, Route} from "react-router-dom"

import Dashboard from "./components/Dashboard/Dashboard"
import HomePage from "./components/HomePage/HomePage";
import Editor from './components/Editor/Editor'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/docs/dashboard' element={<Dashboard />} />
            <Route path='/docs' element={<Editor />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

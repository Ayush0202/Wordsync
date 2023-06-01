import Dashboard from "./components/Dashboard/Dashboard"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/docs/dashboard' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

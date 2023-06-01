import Dashboard from "./components/Dashboard/Dashboard"
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/docs/dashboard' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

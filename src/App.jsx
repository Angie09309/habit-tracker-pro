import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth.jsx";
import { Today } from "./pages/Today.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Today />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
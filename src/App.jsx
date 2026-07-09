import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Today } from "./pages/Today.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Today />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
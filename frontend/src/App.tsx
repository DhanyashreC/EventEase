import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";

<Route path="/register" element={<Register />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
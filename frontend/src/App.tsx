import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function Login() {
  return <h1>Login Page</h1>;
}

function Register() {
  return <h1>Register Page</h1>;
}

function Events() {
  return <h1>Events Page</h1>;
}

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
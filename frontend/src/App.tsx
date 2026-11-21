import MyBookings from "./pages/MyBookings";
import TicketBooking from "./pages/TicketBooking";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import EventDetails from "./pages/EventDetails";
import Categories from "./pages/Categories"; // NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/categories" element={<Categories />} /> {/* NEW */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/book" element={<TicketBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
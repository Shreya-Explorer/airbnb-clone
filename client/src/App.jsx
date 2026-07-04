import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import PropertyDetails from "./pages/PropertyDetails";
import BookProperty from "./pages/BookProperty";
import MyBookings from "./pages/MyBookings";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/book/:id" element={<BookProperty />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-listings" element={<MyListings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
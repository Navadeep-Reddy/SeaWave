import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking/:userId/:eventId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

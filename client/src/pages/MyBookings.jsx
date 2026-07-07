import { useEffect, useState } from "react";
import axios from "../api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `axios.get("/api/bookings");`
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={booking.property.image}
              alt={booking.property.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-2xl font-bold">
                {booking.property.title}
              </h2>

              <p>📍 {booking.property.location}</p>

              <p>💰 ₹{booking.property.price}/night</p>

              <p className="mt-4">
                📅 Check-in:
                {" "}
                {new Date(booking.checkIn).toLocaleDateString()}
              </p>

              <p>
                📅 Check-out:
                {" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BookProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [property, setProperty] = useState(null);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/properties"
      );

      const selected = res.data.find((p) => p._id === id);

      setProperty(selected);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          property: id,
          user: user.id,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        }
      );

      alert("Booking Successful! 🎉");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  if (!property) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-6">
        {property.title}
      </h1>

      <p className="text-gray-600">
        📍 {property.location}
      </p>

      <p className="text-xl font-semibold mt-2">
        ₹{property.price}/night
      </p>

      <form
        onSubmit={handleBooking}
        className="mt-8 space-y-4"
      >
        <div>
          <label className="block mb-1">
            Check-in
          </label>

          <input
            type="date"
            name="checkIn"
            value={booking.checkIn}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">
            Check-out
          </label>

          <input
            type="date"
            name="checkOut"
            value={booking.checkOut}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <button
          className="w-full bg-red-500 text-white py-3 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookProperty;
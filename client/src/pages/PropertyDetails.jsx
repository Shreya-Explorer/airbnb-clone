import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api";
import Navbar from "../components/Navbar";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await axios.get("/api/properties");

      const selected = res.data.find((p) => p._id === id);

      setProperty(selected);
    } catch (error) {
      console.log(error);
    }
  };

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <h1 className="text-3xl font-bold animate-pulse">
            Loading Property...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-6xl mx-auto px-6">

          {/* Property Image */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
          />

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

            {/* Title */}
            <div className="flex flex-col md:flex-row justify-between items-center">

              <div>
                <h1 className="text-4xl font-bold">
                  🏡 {property.title}
                </h1>

                <p className="text-gray-500 text-lg mt-2">
                  📍 {property.location}
                </p>
              </div>

              <div className="mt-4 md:mt-0 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-bold">
                ⭐ 4.9 (128 Reviews)
              </div>

            </div>

            {/* Price */}
            <h2 className="text-4xl font-bold text-red-500 mt-8">
              ₹{property.price}
              <span className="text-xl text-gray-500 font-normal">
                {" "} / night
              </span>
            </h2>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">
                📝 Description
              </h2>

              <p className="text-gray-700 leading-8">
                {property.description}
              </p>
            </div>

            {/* About */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                🏡 About this Stay
              </h2>

              <p className="text-gray-700 leading-8">
                Experience a relaxing stay with modern interiors,
                breathtaking views, spacious rooms, and premium
                amenities. Perfect for families, couples, and
                weekend getaways.
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-5">
                ✨ Amenities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  📶 Free WiFi
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  🚗 Free Parking
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  🏊 Swimming Pool
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  ❄️ Air Conditioning
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  🍽️ Kitchen
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  📺 Smart TV
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  🔥 Bonfire
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  🛎️ 24×7 Support
                </div>

              </div>

            </div>

            {/* House Rules */}
            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                📜 House Rules
              </h2>

              <div className="grid grid-cols-2 gap-4 text-gray-700">

                <p>🚭 No Smoking</p>
                <p>🐶 Pets Allowed</p>
                <p>🎉 No Loud Parties</p>
                <p>🕑 Check-in: 2:00 PM</p>
                <p>🕚 Check-out: 11:00 AM</p>
                <p>👨‍👩‍👧 Family Friendly</p>

              </div>

            </div>

            {/* Why Guests Love It */}
            <div className="mt-10 bg-red-50 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                ❤️ Why Guests Love It
              </h2>

              <ul className="space-y-2 text-gray-700">

                <li>✔ Beautiful Location</li>
                <li>✔ Clean & Spacious Rooms</li>
                <li>✔ Friendly Host</li>
                <li>✔ Great Value for Money</li>
                <li>✔ Safe & Peaceful Environment</li>

              </ul>

            </div>

            {/* Book Button */}
            <Link
              to={`/book/${property._id}`}
              className="block text-center bg-red-500 hover:bg-red-600 transition text-white py-4 rounded-xl mt-10 text-2xl font-bold"
            >
              📅 Book Now
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default PropertyDetails;
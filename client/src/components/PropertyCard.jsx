import axios from "axios";
import { Link } from "react-router-dom";

function PropertyCard({ property, fetchProperties }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/properties/${property._id}`
      );

      alert("Property deleted successfully!");
      fetchProperties();
    } catch (error) {
      console.log(error);
      alert("Failed to delete property.");
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Property Image */}
      <Link to={`/property/${property._id}`}>

        <div className="relative">

          <img
            src={property.image}
            alt={property.title}
            className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500"
          />

          {/* Rating */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow font-semibold text-sm">
            ⭐ 4.9
          </div>

          {/* Favourite */}
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow text-red-500 text-xl">
            ❤️
          </div>

        </div>

        {/* Details */}
        <div className="p-5">

          <h2 className="text-2xl font-bold mb-2">
            {property.title}
          </h2>

          <p className="text-gray-500 flex items-center gap-2">
            📍 {property.location}
          </p>

          <p className="mt-3 text-2xl font-bold text-red-500">
            ₹{property.price}
            <span className="text-gray-500 text-base font-normal">
              {" "} / night
            </span>
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              Free WiFi
            </span>

            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              Parking
            </span>

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Best Rated
            </span>

          </div>

        </div>

      </Link>

      {/* Buttons */}
      <div className="px-5 pb-5 flex gap-3">

        <Link
          to={`/edit-property/${property._id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white text-center py-3 rounded-xl font-semibold"
        >
          ✏️ Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl font-semibold"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default PropertyCard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function MyListings() {
  const [properties, setProperties] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const res = await axios.get("/api/properties");

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center">

            <div>
              <h1 className="text-5xl font-bold">
                🏠 My Listings
              </h1>

              <p className="mt-2 text-lg opacity-90">
                Manage all the properties you've listed.
              </p>
            </div>

            <Link
              to="/add-property"
              className="mt-6 md:mt-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              ➕ Add Property
            </Link>

          </div>
        </div>

        {/* Property List */}
        <div className="max-w-7xl mx-auto px-8 py-10">

          {properties.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h2 className="text-3xl font-bold mb-3">
                😔 No Properties Yet
              </h2>

              <p className="text-gray-500 mb-6">
                Start hosting by adding your first property.
              </p>

              <Link
                to="/add-property"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                ➕ Add Your First Property
              </Link>

            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">
                  Your Properties
                </h2>

                <span className="text-gray-600 font-semibold">
                  {properties.length} Properties
                </span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    fetchProperties={fetchMyProperties}
                  />
                ))}

              </div>
            </>
          )}

        </div>

      </div>
    </>
  );
}

export default MyListings;
import { useEffect, useState } from "react";
import axios from "../api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProperties();
  }, [search, maxPrice]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties?search=${search}&maxPrice=${maxPrice}`
      );

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white">
          <div className="max-w-7xl mx-auto px-8 py-20">

            <h1 className="text-6xl font-extrabold mb-5">
              🏡 Find your next perfect stay
            </h1>

            <p className="text-2xl max-w-3xl leading-relaxed opacity-95">
              Explore luxury villas, cozy cottages, beach houses,
              modern apartments and hill resorts across India.
            </p>

          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* Search Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              🔍 Search Your Dream Stay
            </h2>

            <div className="flex flex-col lg:flex-row gap-4">

              <input
                type="text"
                placeholder="📍 Search by location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <input
                type="number"
                placeholder="💰 Maximum Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <button
                onClick={() => {
                  setSearch("");
                  setMaxPrice("");
                }}
                className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-4 rounded-xl font-semibold"
              >
                Clear
              </button>

            </div>

          </div>

          {/* Property Count */}
          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              🌟 Popular Stays
            </h2>

            <span className="text-gray-600 font-semibold">
              {properties.length} Properties Found
            </span>

          </div>

          {/* Property Grid */}
          {properties.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <h2 className="text-3xl font-bold mb-3">
                😔 No Properties Found
              </h2>

              <p className="text-gray-500">
                Try changing the location or maximum price.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  fetchProperties={fetchProperties}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Home;
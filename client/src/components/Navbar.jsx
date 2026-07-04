import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-red-500 tracking-wide"
        >
          🏡 Airbnb Clone
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <Link
                to="/add-property"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition"
              >
                + Add Property
              </Link>
              <Link
                to="/my-listings"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full transition"
              >
                🏠 My Listings
              </Link>
              <Link
                to="/my-bookings"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full transition"
              >
                📅 My Bookings
              </Link>

              <div className="bg-gray-100 px-4 py-2 rounded-full font-medium">
                👋 Hello, {user.name}
              </div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-red-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
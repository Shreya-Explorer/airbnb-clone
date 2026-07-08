import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      data.append("owner", user.id);

      await axios.post(
        "/api/properties",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Added Successfully! 🎉");
      navigate("/");
    } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
          error.message ||
          "Failed to add property."
        );
      }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
          🏡 Add New Property
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price per Night"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition"
          >
            ➕ Add Property
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProperty;
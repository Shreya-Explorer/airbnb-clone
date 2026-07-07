import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate, useParams } from "react-router-dom";

function EditProperty() {
  const { id } = useParams();
  console.log("Property ID:", id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/properties"
      );

      const property = res.data.find((p) => p._id === id);

      if (property) {
        setFormData({
          title: property.title,
          location: property.location,
          price: property.price,
          description: property.description || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ID:", id);
    console.log("Form Data:", formData);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property updated successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to update property.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Property ✏️
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows="4"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            className="w-full bg-blue-500 text-white py-3 rounded"
          >
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
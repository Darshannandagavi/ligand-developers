import React, { useEffect, useState } from "react";
import axios from "axios";

const Homework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [formData, setFormData] = useState({
    chapterNumber: "",
    chapterName: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://ligand-software-solutions-workshop-2.onrender.com/api/assignments"; // adjust if different

  // 📦 Fetch all homeworks
  const fetchHomeworks = async () => {
    try {
      const res = await axios.get(`${API_URL}/gethomework`);
      setHomeworks(res.data);
    } catch (error) {
      console.error("Error fetching homework:", error);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  // 📩 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ➕ Add or ✏️ Edit Homework
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chapterNumber || !formData.chapterName || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert("Homework updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        alert("Homework added successfully!");
      }
      setFormData({ chapterNumber: "", chapterName: "", description: "" });
      setEditingId(null);
      fetchHomeworks();
    } catch (error) {
      console.error("Error submitting homework:", error);
    }
  };

  // 🗑️ Delete homework
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this homework?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Homework deleted!");
        fetchHomeworks();
      } catch (error) {
        console.error("Error deleting homework:", error);
      }
    }
  };

  // ✏️ Edit handler
  const handleEdit = (hw) => {
    setFormData({
      chapterNumber: hw.chapterNumber,
      chapterName: hw.chapterName,
      description: hw.description,
    });
    setEditingId(hw._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-5">
          {editingId ? "Edit Homework" : "Add Homework"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Chapter Number</label>
            <input
              type="number"
              name="chapterNumber"
              value={formData.chapterNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter chapter number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Chapter Name</label>
            <input
              type="text"
              name="chapterName"
              value={formData.chapterName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter chapter name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Homework Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              placeholder="Enter description"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {editingId ? "Update Homework" : "Add Homework"}
          </button>
        </form>
      </div>

      {/* Homework List */}
      <div className="max-w-4xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-3 text-center">All Homeworks</h3>
        {homeworks.length === 0 ? (
          <p className="text-center text-gray-500">No homework added yet.</p>
        ) : (
          <div className="grid gap-4">
            {homeworks.map((hw) => (
              <div
                key={hw._id}
                className="bg-white shadow-md p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-lg">
                    Chapter {hw.chapterNumber}: {hw.chapterName}
                  </h4>
                  <p className="text-gray-600 mt-1">{hw.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Added on: {new Date(hw.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(hw)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hw._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homework;

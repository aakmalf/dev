"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    desc: "",
    category: "",
    link: "",
  });

  useEffect(() => {
    // Fetch projects data
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const result = await response.json();
        
        // Perbaikan: ekstrak data proyek dari response
        if (result.success && Array.isArray(result.data)) {
          setProjects(result.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle row selection
  const handleSelect = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id)
        : [...prev, id]
    );
  };

  // Handle project deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete project");

        // Remove project from state
        setProjects(projects.filter((project) => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        setError("Failed to delete project");
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) throw new Error("Failed to add project");

      const data = await response.json();
      setProjects((prev) => [...prev, data.data]);
      setNewProject({ title: "", desc: "", category: "", link: "" });
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage your projects here.</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-6xl mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => (window.location.href = "/admin/projects/new")}
            >
              ADD NEW
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => alert("Exporting data...")}
            >
              EXPORT
            </button>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="category"
              value={newProject.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="desc"
              value={newProject.desc}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="link"
              value={newProject.link}
              onChange={handleInputChange}
              placeholder="Link"
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            ADD PROJECT
          </button>
        </form>

        {loading ? (
          <div className="text-center p-6">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-sm">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-2 border border-gray-300">✅</th>
                  <th className="p-2 border border-gray-300">ID</th>
                  <th className="p-2 border border-gray-300">Title</th>
                  <th className="p-2 border border-gray-300">Category</th>
                  <th className="p-2 border border-gray-300">Description</th>
                  <th className="p-2 border border-gray-300">Link</th>
                  <th className="p-2 border border-gray-300">Created At</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-600">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr
                      key={project._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="p-2 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project._id)}
                          onChange={() => handleSelect(project._id)}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                        {project._id?.substring(0, 6)}...
                      </td>
                      <td className="p-2 border border-gray-300">
                        {project.title}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {project.category}
                      </td>
                      <td className="p-2 border border-gray-300 max-w-xs truncate">
                        {project.desc}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      </td>
                      <td className="p-2 border border-gray-300">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <div className="flex space-x-2 justify-center">
                          <a
                            href={`/admin/projects/edit/${project._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

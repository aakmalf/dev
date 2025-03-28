"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProject({ params }) {
  const router = useRouter();
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    link: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${id}`);
        const response = await fetch(`/api/projects/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Fetched project data:", result);
        
        if (result.success && result.data) {
          setProject(result.data);
          setFormData({
            title: result.data.title || "",
            desc: result.data.desc || "",
            category: result.data.category || "",
            link: result.data.link || "",
          });
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(`Failed to fetch project: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Updating project with ID: ${id}`, formData);
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`Failed to update project: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Updated project:", result);

      // Redirect back to admin page
      router.push("/admin");
    } catch (error) {
      console.error("Error updating project:", error);
      setError(`Failed to update project: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen py-4 bg-white dark:bg-gray-900">
        <div className="text-center p-6">
          <p className="text-gray-600 dark:text-gray-300">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen py-4 bg-white dark:bg-gray-900">
        <div className="text-center p-6">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push("/admin")}
            className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Edit Project</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-white bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-white bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-white bg-white dark:bg-gray-800"
              rows="4"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-white bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update Project
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

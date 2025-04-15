"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const secretKey = searchParams.get("key");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/projects/edit/${id}?key=${secretKey}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}?key=${secretKey}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status}`);
        }

        // Remove the deleted project from state
        setProjects((prev) => prev.filter((project) => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert(`Failed to delete project: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
        <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h1>
      
      <button 
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => router.push(`/admin/projects/new?key=${secretKey}`)}
      >
        Add New Project
      </button>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left text-gray-800 dark:text-white">Title</th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left text-gray-800 dark:text-white">Category</th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left text-gray-800 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">{project.title}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">{project.category}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(project._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

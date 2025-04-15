"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const secretKey = searchParams.get("key");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating new project:", formData);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(
          `Failed to create project: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Created project:", result);

      // Redirect back to admin page with the secret key
      router.push(`/admin?key=${secretKey}`);
    } catch (error) {
      console.error("Error creating project:", error);
      setError(`Failed to create project: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Add New Project
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
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
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
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
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
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
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Link
            </label>
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
              Create Project
            </button>

            <button
              type="button"
              onClick={() => router.push(`/admin?key=${secretKey}`)}
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

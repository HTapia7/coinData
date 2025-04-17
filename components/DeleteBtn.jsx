"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function DeleteButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the ID from the router

  const handleDelete = async () => {
    if (!id) {
      setError("No ID provided.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/delete-data/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete session");
      }

      const data = await res.json();
      console.log(`Deleted session with ID: ${id}`);

      // Optionally, you can redirect or update state here
      // For example: router.push("/dashboard"); // Redirect to another page

      // Reset error if successful
      setError(null);
    } catch (err) {
      console.error("Failed to delete session:", err);
      setError("An error occurred while deleting the session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        } text-white font-bold py-2 px-4 rounded-xl transition-all duration-200`}
      >
        {loading ? "Deleting..." : "Delete Session"}
      </button>

      {error && (
        <div className="mt-4 text-red-500 text-sm">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

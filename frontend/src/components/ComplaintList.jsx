import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ComplaintList({ refresh }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/complaints/my");
      setComplaints(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch complaints.");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [refresh]);

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (complaints.length === 0) {
    return <p>No complaints found. Submit a new one!</p>;
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div key={complaint._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
          <p className="text-gray-700 text-sm mt-1">{complaint.description}</p>
          <p className={`text-sm font-medium mt-2 ${
            complaint.status === "Resolved" ? "text-green-600" : "text-yellow-600"
          }`}>
            Status: {complaint.status}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

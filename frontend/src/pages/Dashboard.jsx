import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ComplaintList from "../components/ComplaintList";
import ComplaintForm from "../components/ComplaintForm";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [refreshList, setRefreshList] = useState(false);

  const handleComplaintSubmitted = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome, {user?.name || "User"} 👋</h1>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-8">You’re logged in to the Complaint Management System. Here you can view your complaints and submit new ones.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit a New Complaint</h2>
            <ComplaintForm onComplaintSubmitted={handleComplaintSubmitted} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Complaints</h2>
            <ComplaintList refresh={refreshList} />
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="p-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">
//           Welcome to Dashboard
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-2xl shadow-lg">
//             <h2 className="font-semibold text-lg mb-2">Active Requests</h2>
//             <p className="text-gray-500">View all pending requests.</p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg">
//             <h2 className="font-semibold text-lg mb-2">Profile</h2>
//             <p className="text-gray-500">Update your account information.</p>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg">
//             <h2 className="font-semibold text-lg mb-2">Settings</h2>
//             <p className="text-gray-500">Change preferences and password.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import Navbar from "../components/Navbar";
import { useUserStore } from "../stores/useUserStore";

const Dashboard = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome, {user?.name || "User"}
        </h1>

        <button
          onClick={logout}
          className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md"
        >
          Logout
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-lg mb-2">Active Requests</h2>
            <p className="text-gray-500">View all pending requests.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-lg mb-2">Profile</h2>
            <p className="text-gray-500">Update your account information.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-lg mb-2">Settings</h2>
            <p className="text-gray-500">Change preferences and password.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

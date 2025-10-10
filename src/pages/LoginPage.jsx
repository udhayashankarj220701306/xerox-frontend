import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import Navbar from "../components/Navbar"; // include your Navbar

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Mail className="absolute left-3 top-10 text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Lock className="absolute left-3 top-10 text-gray-400" size={18} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-150 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member?{" "}
            <Link
              to="/signup"
              className="text-emerald-500 hover:text-emerald-600 font-medium"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;


// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import Navbar from "../components/Navbar";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, loading } = useUserStore();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(email, password, () => navigate("/dashboard")); // navigate after login
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
//       <Navbar />
//       <div className="flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
//             Login to your account
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="relative">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <Mail className="absolute left-3 top-10 text-gray-400" size={18} />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400"
//               />
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <Lock className="absolute left-3 top-10 text-gray-400" size={18} />
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center items-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-150 disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="mr-2 h-5 w-5 animate-spin" /> Loading...
//                 </>
//               ) : (
//                 <>
//                   <LogIn className="mr-2 h-5 w-5" /> Login
//                 </>
//               )}
//             </button>
//           </form>
//           <p className="mt-6 text-center text-sm text-gray-600">
//             Not a member?{" "}
//             <Link to="/signup" className="text-emerald-500 hover:text-emerald-600 font-medium">
//               Sign up now <ArrowRight className="inline h-4 w-4" />
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

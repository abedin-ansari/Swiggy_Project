import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidateData } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = checkValidateData(name, email, password);
    setError(message);
    if (message) {
      toast.error(message);
      return;
    }

    try {
      const loadingToast = toast.loading("Creating your account...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      const { uid, email: userEmail, displayName } = userCredential.user;
      dispatch(
        addUser({
          uid: uid,
          email: userEmail,
          displayName: displayName,
        })
      );

      toast.dismiss(loadingToast);
      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-2 sm:pt-0 sm:items-center px-4 sm:px-6 lg:px-8 relative overflow-y-auto"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2940&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="w-full max-w-[450px] backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl relative bg-white/20 hover:bg-white/25 transition-all duration-300 border border-white/30 mt-2 sm:mt-[-60px]">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-white mb-2">
            Create Account
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto rounded-full mb-3"></div>
          <p className="text-center text-gray-200 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-400 hover:text-orange-300 transition-all duration-300 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 bg-red-500/20 backdrop-blur-md border-l-4 border-red-500 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-4 w-4 text-red-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-xs text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-orange-300 group-hover:text-orange-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-orange-700 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 placeholder-gray-300 backdrop-blur-sm text-sm"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-orange-300 group-hover:text-orange-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-2.5 sm:py-3 text-orange-700 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 placeholder-white backdrop-blur-sm text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-orange-300 group-hover:text-orange-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-2.5 sm:py-3 text-orange-700 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 placeholder-white backdrop-blur-sm text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="relative w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(251,146,60,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-orange-300 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </span>
              Create Account
            </button>

            <div className="mt-4 bg-white/20 backdrop-blur-sm border border-white/30 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-white/90 mb-3">
                Password Requirements:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                  <svg
                    className="h-4 w-4 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-orange-700">Min. 8 chars</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                  <svg
                    className="h-4 w-4 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-orange-700">One uppercase</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                  <svg
                    className="h-4 w-4 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-orange-700">One lowercase</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                  <svg
                    className="h-4 w-4 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-orange-700">One number</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

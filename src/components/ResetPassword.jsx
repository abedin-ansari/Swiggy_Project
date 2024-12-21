import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Sending reset link...");
      await sendPasswordResetEmail(auth, email);
      toast.dismiss(loadingToast);
      toast.success("Reset link sent to your email!");
      setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2940&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="w-full max-w-[400px] backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl relative bg-white/20 hover:bg-white/25 transition-all duration-300 border border-white/30">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-bold text-white mb-2">
            Reset Password
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto rounded-full mb-4"></div>
          <p className="text-center text-gray-200 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {isEmailSent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-200 mb-6">
                We've sent password reset instructions to your email.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white rounded-xl transition-all duration-300 font-medium"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
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
                  className="block w-full pl-11 pr-4 py-3.5 text-orange-700 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200 placeholder-white backdrop-blur-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white rounded-xl transition-all duration-300 font-medium hover:shadow-[0_20px_50px_rgba(251,146,60,0.3)] hover:-translate-y-0.5"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

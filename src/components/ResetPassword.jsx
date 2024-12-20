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
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {isEmailSent ? (
          <div className="text-center">
            <div className="mb-4 text-green-500 text-5xl">✓</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Email Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Please check your email for password reset instructions.
            </p>
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Send Reset Link
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

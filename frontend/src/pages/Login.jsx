import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        emailOrMobile: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

            <div className="w-full sm:w-[420px] md:w-[500px] bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Sign In
                </h2>

                {/* Subheading */}
                <p className="text-gray-500 mt-2 mb-6">
                    Welcome back! Please enter your details.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email or Mobile */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your email or mobile
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Email or Mobile"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, emailOrMobile: e.target.value })
                            }
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input type="checkbox" className="accent-blue-600" />
                            Remember me
                        </label>

                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                {/* Sign Up Redirect */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;

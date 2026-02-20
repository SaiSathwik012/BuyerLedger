import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        register(form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">

            <div className="w-full sm:w-[420px] md:w-[500px] bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Create Account
                </h2>

                {/* Subheading */}
                <p className="text-gray-500 mt-2 mb-6">
                    Fill in your details to get started
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your full name
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your email
                        </label>
                        <input
                            required
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter 10-digit mobile number
                        </label>
                        <input
                            required
                            type="text"
                            maxLength="10"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, mobile: e.target.value })
                            }
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Create a password
                        </label>
                        <input
                            required
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Sign In Redirect */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;

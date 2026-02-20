import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold text-blue-600"
                >
                    BuyerLedger
                </Link>

                {/* Right Side */}
                {user && (
                    <div className="flex items-center space-x-6">

                        <Link
                            to="/upload"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Upload
                        </Link>

                        <Link
                            to="/buyers"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            View
                        </Link>

                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

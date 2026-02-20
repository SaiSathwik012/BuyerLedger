import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] px-4">

            <div className="text-center max-w-3xl">

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Secure Buyer Data Management Platform
                </h1>

                {/* Subheading */}
                <p className="text-gray-600 text-base sm:text-lg mb-8">
                    Upload, manage and analyze buyer financial records securely with JWT authentication and enterprise-grade security.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    {/* Sign In - Blue */}
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Sign In
                    </Link>

                    {/* Sign Up - White */}
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition duration-300"
                    >
                        Sign Up
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Home;

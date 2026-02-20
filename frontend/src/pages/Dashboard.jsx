import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 px-4 py-10">

                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                    Dashboard
                </h1>

                <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">

                    {/* Upload Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Upload Buyer Data
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Upload CSV or Excel files containing buyer ledger
                            information.
                        </p>

                        <Link
                            to="/upload"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Go to Upload
                        </Link>
                    </div>

                    {/* Buyers Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            View Buyers
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Search, filter and paginate through your uploaded
                            buyer records.
                        </p>

                        <Link
                            to="/buyers"
                            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
                        >
                            View Buyers
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Dashboard;

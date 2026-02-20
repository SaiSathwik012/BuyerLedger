import { useEffect, useState } from "react";
import api from "../api/axios";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";

const Buyers = () => {
    const [buyers, setBuyers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(
                    `/buyers?page=${page}&limit=${limit}&search=${search}`
                );

                if (Array.isArray(res.data)) {
                    setBuyers(res.data);
                    setTotal(res.data.length);
                } else {
                    setBuyers(res.data.data || []);
                    setTotal(res.data.total || 0);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [page, search]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 px-4 py-8">

                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Buyer List
                        </h2>

                        <input
                            type="text"
                            placeholder="Search by Name, Email or Mobile..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mobile</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Paid</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {buyers.length > 0 ? (
                                    buyers.map((b) => (
                                        <tr key={b.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">{b.name}</td>
                                            <td className="px-4 py-3">{b.email}</td>
                                            <td className="px-4 py-3">{b.mobile}</td>
                                            <td className="px-4 py-3">
                                                ₹ {b.total_invoice_amount}
                                            </td>
                                            <td className="px-4 py-3 text-green-600 font-medium">
                                                ₹ {b.total_amount_paid}
                                            </td>
                                            <td className="px-4 py-3 text-red-600 font-semibold">
                                                ₹ {b.total_amount_due}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No Buyers Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6">
                        <Pagination
                            page={page}
                            setPage={setPage}
                            total={total}
                            limit={limit}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Buyers;

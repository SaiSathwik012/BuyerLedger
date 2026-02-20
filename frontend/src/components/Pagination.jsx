const Pagination = ({ page, setPage, total, limit }) => {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex items-center justify-center mt-8 space-x-4">

            {/* Prev Button */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300
                    ${page === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    }`}
            >
                Prev
            </button>

            {/* Page Info */}
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-semibold">
                Page {page} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-300
                    ${page === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    }`}
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;

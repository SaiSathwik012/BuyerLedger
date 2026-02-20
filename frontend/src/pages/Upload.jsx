import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // ✅ File Validation
    const validateFile = (selectedFile) => {
        if (!selectedFile) return false;

        const allowedExtensions = ["csv", "xls", "xlsx"];
        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            alert("Only CSV, XLS, and XLSX files are allowed");
            return false;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            alert("File size must not exceed 5MB");
            return false;
        }

        return true;
    };

    const handleFileChange = (selectedFile) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully");
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Upload Buyer Data
                        </h1>
                        <p className="text-gray-500 mt-3">
                            Upload CSV or Excel files containing buyer financial records
                        </p>
                    </div>

                    {/* Drag & Drop Box */}
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-10 text-center transition 
                        ${dragActive
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-white"
                            }`}
                    >
                        <div className="text-4xl mb-4">📁</div>

                        <p className="text-gray-700 font-medium">
                            Drag and drop your file here
                        </p>

                        <p className="text-gray-500 my-4">or</p>

                        <label className="cursor-pointer inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Browse Files
                            <input
                                type="file"
                                accept=".csv,.xls,.xlsx"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleFileChange(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>

                        <p className="text-sm text-gray-500 mt-4">
                            Accepted formats: CSV, XLS, XLSX
                        </p>
                        <p className="text-sm text-gray-500">
                            Maximum file size: 5MB
                        </p>
                    </div>

                    {/* Selected File Section */}
                    {file && (
                        <div className="mt-6 flex items-center justify-between bg-gray-100 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📄</span>
                                <span className="text-gray-700 font-medium">
                                    {file.name}
                                </span>
                            </div>

                            <button
                                onClick={handleUpload}
                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Upload
                            </button>
                        </div>
                    )}

                    {/* Upload Guidelines */}
                    <div className="mt-12 bg-gray-50 border rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Upload Guidelines
                        </h3>

                        <ul className="space-y-3 text-gray-600 text-sm list-disc pl-5">
                            <li>Ensure your file is in CSV, XLS, or XLSX format</li>
                            <li>File size should not exceed 5MB</li>
                            <li>
                                Required columns: Name, Email, Mobile, Address,
                                Total Invoice Amount, Total Amount Paid, Total Amount Due
                            </li>
                            <li>Email addresses must be valid format</li>
                            <li>Mobile numbers should be 10 digits</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Upload;

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const buyerRoutes = require("./routes/buyer.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// ✅ Proper CORS setup for production
app.use(
    cors({
        origin: [
            "http://localhost:5173",          // local frontend
            "https://buyerledger.onrender.com" // if frontend also hosted on Render
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/buyers", buyerRoutes);

app.use(errorMiddleware);

module.exports = app;
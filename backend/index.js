// Server setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDb from "./utils/db.js";

// Import routes
import authroutes from './routes/authroutes.js';
import employeeroutes from './routes/employeeroutes.js';
import adminroutes from './routes/adminroutes.js';
import departmentroutes from './routes/departmentroutes.js';
import leaveroutes from './routes/leaveroutes.js';
import attendanceroutes from './routes/attendanceroutes.js';

dotenv.config({ path: './config.env' });

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup with multiple allowed origins from .env
const allowedOrigins = process.env.FRONTEND_URL?.split(',').map(url => url.trim()) || [];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api", authroutes);
app.use("/api/employee", employeeroutes);
app.use("/api/admin", adminroutes);
app.use("/api/employee/department", departmentroutes);
app.use("/api/employee/leave", leaveroutes);
app.use("/api/employee/attendance", attendanceroutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found", success: false });
});

// Error handler
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        success: false,
    });
};

app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    connectMongoDb();
    console.log(`Server running at Port ${PORT}`);
});

export default app;

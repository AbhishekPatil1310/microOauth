import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

dotenv.config();
import authRoutes from "./router/auth.router.js";
import "./config/passport.js"; // Google OAuth strategy

const app = express();

// ✅ Deployment-ready CORS
const allowedOrigins = [
  "http://localhost:5173",          // local dev (Vite default)
  "http://localhost:3000",          // local dev (CRA/Next.js default)
   "https://moonrider-frontend-2hjp.vercel.app",
    "https://moonrider-frontend-2hjp-q6ihrubqf-abhisheks-projects-680a2fd9.vercel.app",
  "https://moonrider-frontend-lgjdaa64j-abhisheks-projects-680a2fd9.vercel.app",
"https://moonrider-frontend.vercel.app",
  "https://www.advestors.org"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse cookies & JSON
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);



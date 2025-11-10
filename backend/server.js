import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// ✅ Create express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Complaint Management API running 🚀");
});

// ✅ Routes (uncomment when ready)
import authRoutes from "./routes/authRoutes.js";
// import complaintRoutes from "./routes/complaintRoutes.js"; // only if exists

app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

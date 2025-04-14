import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS

dotenv.config(); // ✅ Load env variables

const app = express();

// ✅ Use middleware
app.use(cors());              // Allow all origins (for development)
app.use(express.json());      // Enable JSON body parsing

// ✅ Connect to MongoDB
async function connectDb() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("Mongo URI not found in environment variables");
        return;
    }

    await mongoose.connect(uri);
}

// ✅ Simple route
app.get('/', (req, res) => {
    console.log("hello");
    res.send("Hello World");
});

// ✅ Connect DB then start server
connectDb()
    .then(() => {
        console.log('Mongo connected');

        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

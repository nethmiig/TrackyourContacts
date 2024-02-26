// Import express using ESM syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Retrieve the port and MongoDB URI from environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server once MongoDB connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/contacts', contactRoutes); // Use contactRoutes for /contacts route

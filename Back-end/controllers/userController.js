import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = new User({ email, username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetUsers = async (req, res) => {
    try {
        const deleteResult = await User.deleteMany({});
        if (deleteResult?.deletedCount > 0) {
            res.status(200).json({ message: 'All users deleted successfully' });
        } else {
            res.status(404).json({ message: 'No users found to delete' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        let token = jwt.sign({ id: user._id, isAdmin: false, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        if(user.username === "admin"){
            token = jwt.sign({ id: user._id, isAdmin:true, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        }

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

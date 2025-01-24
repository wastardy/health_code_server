import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log('\nregister incoming data:', req.body, '\n');

    try {
        const { username, email, password, name } = req.body;

        const existingUser = await User.findOne({
            where: { username },
        });

        const existingEmail = await User.findOne({
            where: { email },
        });

        if (existingUser || existingEmail) {
            return res.status(409).json({
                message: 'User with this username or email already exists',
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await User.create({
            username, 
            email, 
            password: hashedPassword, 
            name,
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user_id: newUser.id,
        });
    }
    catch(err) {
        console.error(`Error during registration: ${err.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req, res) => {
    
}

export const logout = async (req, res) => {

}
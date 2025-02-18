import User from '../models/User.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
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
    catch (err) {
        serverErrorHandler(register.name, err, res);
    }
}

export const login = async (req, res) => {
    console.log('\nLogin incoming data:', req.body, '\n');

    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Incorrect password',
            })
        }

        const jwtToken = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_KEY, 
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', jwtToken, {
            httpOnly: true, 
            secure: false,
            sameSite: "none"
        }).status(200).json({
            message: 'Login successful',
            jwtToken, 
            user_id: user.id, 
            email: user.email,
        });
    }
    catch (err) {
        serverErrorHandler(login.name, err, res);
    }
}

export const devLogin = async (req, res) => {
    const testUser = {
        id: 4,
        username: "theanthonyedwards_",
        email: "ant@gmail.com",
        password: "1",
        name: "Anthony Edwards",
        cover_image: "https://png.pngtree.com/thumb_back/fw800/background/20240522/pngtree-above-the-clouds-and-above-minneapolis-minnesota-from-airplane-image_15682301.jpg",
        profile_image: "https://playerstv.com/wp-content/uploads/2024/02/GetPaidStock.com-65d3b9d9dc21e.jpg",
        bio: null,
        sex: "he/him",
        age: 23,
        weight: "102.00",
        height: "193.00"
    };

    const jwtToken = jwt.sign(testUser, process.env.JWT_KEY, { expiresIn: '7d' });

    res.cookie('accessToken', jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none"
    }).status(200).json({
        message: 'Test login successful',
        jwtToken
    });
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            secure: true, 
            sameSite: 'none',
        });
        
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    }
    catch (err) {
        serverErrorHandler(logout.name, err, res);
    }
}
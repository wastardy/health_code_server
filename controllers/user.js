import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
    const user_id = parseInt(req.params.user_id);
    console.log(`getUser controller, User id: ${user_id}`);

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...info } = user.toJSON();
        return res.json(info);
    }
    catch (err) {
        console.error('getUser error:', err.message);
        return res.status(500).json({
            error: 'Database error', 
            details: err
        });
    }
}

export const updateUser = (req, res) => {

}
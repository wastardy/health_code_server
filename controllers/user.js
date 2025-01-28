import serverErrorHandler from '../middleware/serverErrorHandler.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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

export const updateUser = async (req, res) => {
    try {
        const currentUserId = parseInt(req.params.user_id);
        const userInfo = req.user;

        console.log(`\nCurrent user id: ${JSON.stringify(currentUserId)}\n`);
        console.log(`\nUser info: ${JSON.stringify(userInfo)}\n`);
        
        if (userInfo.id !== currentUserId) {
            return res.status(403).json('User can only update his own profile!');
        }

        // hash password if it's been passed to body
        if (req.body.password) {
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const [updated] = await User.update(
            {
                username: req.body.username, 
                email: req.body.email, 
                password: req.body.password,
                name: req.body.name,
                cover_image: req.body.cover_image,
                profile_image: req.body.profile_image, 
                bio: req.body.bio, 
                sex: req.body.sex,
                age: req.body.age,
                weight: req.body.weight,
                height: req.body.height,
            }, 
            {
                where: { id: currentUserId },
            },
        );

        if (updated) {
            const updatedUser = await User.findByPk(currentUserId, {
                attributes: { exclude: ['password'] }
            });

            return res.status(200).json({
                message: 'User profile has been updated',
                updated_user_info: updatedUser,
            });
        }

        return res.status(404).json('User not found');
    }
    catch (err) {
        serverErrorHandler(updateUser.name, err, res);
    }
}
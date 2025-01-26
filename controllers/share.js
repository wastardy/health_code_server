import moment from 'moment';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import Posts from '../models/Posts.js';
import Shares from '../models/Shares.js';
import User from '../models/User.js';

export const getShares = async (req, res) => {
    const { post_id } = req.query;
    const userInfo = req.user;

    console.log(`\nUser Info: ${JSON.stringify(userInfo)}\n`);
    console.log(`\nPost ID: ${post_id}\n`);

    if (!post_id) {
        return res.status(400).json('Post ID is required');
    }

    try {
        const shares = await Shares.findAll({
            where: { post_id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'profile_image'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        if (shares.length === 0) {
            return res.status(404).json('No shares found for this post');
        } 

        const countShares = shares.length;

        return res.status(200).json({
            count_shares: countShares, 
            shares: shares,
        });
    }
    catch (err) {
        serverErrorHandler(getShares.name, err, res);
    }
}

export const addShare = async (req, res) => {
    const { post_id } = req.body;
    const userInfo = req.user;

    console.log(`\nUser Info: ${JSON.stringify(userInfo)}\n`);
    console.log(`\nPost ID: ${post_id}\n`);

    if (!post_id) {
        return res.status(400).json('Post ID is required');
    }

    try {
        const post = await Posts.findByPk(post_id);

        if (!post) {
            return res.status(404).json('Post not found');
        }

        const newShare = await Shares.create({
            user_id: userInfo.id,
            post_id: post_id, 
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });

        return res.status(201).json({
            message: 'Post has been shared',
            share: newShare,
        });
    }
    catch (err) {
        serverErrorHandler(addShare.name, err, res);
    }
}
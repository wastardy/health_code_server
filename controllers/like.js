import Likes from '../models/Likes.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import jwt from 'jsonwebtoken';

export const getLikes = async (req, res) => {
    const { post_id } = req.query;

    try {
        const likes = await Likes.findAll({
            where: { post_id: post_id },
            attributes: ['user_id']
        });

        const userIds = likes.map(like => like.user_id);
        const countLikes = userIds.length;

        return res.status(200).json({
            count_likes: countLikes,
            user_ids: userIds,
        });
    }
    catch (err) {
        serverErrorHandler(getLikes.name, err, res);
    }
}

export const addLike = async (req, res) => {
    const token = req.cookies.accessToken;

    console.log(`Token from cookies: ${token}`);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        const { post_id } = req.body;

        try {
            const existingLike = await Likes.findOne({
                where: {
                    user_id: userInfo.id,
                    post_id: post_id,
                },
            });

            if (existingLike) {
                return res.status(400).json('You already liked this post');
            }

            // otherwise
            Likes.create({
                user_id: userInfo.id, 
                post_id: post_id,
            });

            return res.status(200).json('Like has been added');
        }
        catch (err) {
            serverErrorHandler(addLike.name, err, res);
        }
    });
}

export const deleteLike = async (req, res) => {
    const token = req.cookies.accessToken;

    console.log(`Token from cookies: ${token}`);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        const { post_id } = req.params;

        try {
            const existingLike = await Likes.findOne({
                where: {
                    user_id: userInfo.id,
                    post_id: post_id,
                }
            });

            if (!existingLike) {
                return res.status(400).json('You have not liked this post yet');
            }   

            // remove like
            await Likes.destroy({
                where: {
                    user_id: userInfo.id, 
                    post_id: post_id,
                }
            });

            return res.status(200).json('Like has been removed');
        }
        catch (err) {
            serverErrorHandler(deleteLike.name, err, res);
        }
    });
}
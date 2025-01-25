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

}

export const deleteLike = async (req, res) => {

}
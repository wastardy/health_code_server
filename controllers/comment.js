import { User, Comments } from '../models/associations.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getComments = async (req, res) => {
    const token = req.cookies.accessToken;

    console.log(`\nToken from cookies: ${token}\n`);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        const { post_id } = req.query; 
        console.log(`\nPost ID: ${post_id}\n`);
    
        if (!post_id) {
            return res.status(400).json('Post ID is required');
        }

        try {
            const comments = await Comments.findAll({
                where: { post_id }, 
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'profile_image'],
                    }
                ],
                order: [['created_at', 'DESC']],
            });

            if (comments.length === 0) {
                console.log('No comments found for this post');
                return res.status(404).json('No comments found for this post');
            }

            const commentsCount = comments.length;

            return res.status(200).json({
                comments_count: commentsCount, 
                comments: comments,
            });
        }
        catch (err) {
            serverErrorHandler(getComments.name, err, res);
        }
    });
}

export const addComment = async (req, res) => {

}

export const deleteComment = async (req, res) => {

}
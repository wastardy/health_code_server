import { User, Comments, Posts } from '../models/associations.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import moment from 'moment';

export const getComments = async (req, res) => {
    const { post_id } = req.query; 

    console.log(`\nUser Info: ${JSON.stringify(req.user)}\n`);
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
}

export const addComment = async (req, res) => {
    const { desc, post_id } = req.body;
    const userInfo = req.user;
    console.log(`\nUser info: ${JSON.stringify(userInfo)}\n`);

    if (!desc || !post_id) {
        return res.status(400).json('Description and Post ID are required');
    }

    const post = await Posts.findByPk(post_id);

    if (!post) {
        return res.status(404).json('Post not found');
    }

    try {
        const newComment = await Comments.create({
            description: desc,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            user_id: userInfo.id,
            post_id: post_id,
        });

        return res.status(200).json({
            message: 'Comment has been created',
            comment: newComment,
        });
    }
    catch (err) {
        serverErrorHandler(addComment.name, err, res);
    }
}

export const deleteComment = async (req, res) => {
    const { comment_id } = req.params;
    const userInfo = req.user;
    console.log(`\nUser info: ${JSON.stringify(userInfo)}\n`);

    if (!comment_id) {
        return res.status(400).json('Comment ID is required');
    }

    try {
        const comment = await Comments.findByPk(comment_id);

        if (!comment) {
            return res.status(404).json('Comment not found');
        }

        if (comment.user_id !== userInfo.id) {
            return res.status(403).json('You are not authorized to delete this comment');
        }

        await comment.destroy();

        return res.status(200).json('Comment has been deleted');
    }
    catch (err) {
        serverErrorHandler(deleteComment.name, err, res);
    }
}
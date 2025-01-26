import { User, Posts, Relationships } from '../models/associations.js';
import { Op } from 'sequelize';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getPosts = async (req, res) => {
    const { user_id } = req.query;
    const token = req.cookies.accessToken;

    console.log('Token from cookies:', token);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        try {
            // in case user_id is passed e.g. /posts/?user_id=4
            if (user_id !== 'undefined' && user_id) {
                const posts = await Posts.findAll({
                    where: { user_id: user_id },
                    include: [
                        {
                            model: User, 
                            attributes: ['id', 'name', 'profile_image'],
                        }
                    ],
                    order: [['created_at', 'DESC']],
                });

                const countPosts = posts.length;

                return res.status(200).json({
                    count_posts: countPosts,
                    posts: posts,
                });
            }

            // otherwise
            const posts = await Posts.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'profile_image'],
                        include: [
                            {
                                model: Relationships,
                                required: false,
                                where: {
                                    follower_id: userInfo.id,
                                },
                            },
                        ],
                    },
                ],
                where: {
                    [Op.or]: [
                        { user_id: userInfo.id },
                        { '$User.Relationships.following_id$': { [Op.ne]: null } },
                    ],
                },
                order: [['created_at', 'DESC']],
            });
    
            const countPosts = posts.length;

            return res.status(200).json({
                count_posts: countPosts,
                posts: posts,
            });
        }
        catch (err) {
            serverErrorHandler(getPosts.name, err, res);
        }
    });
}

export const addPost = async (req, res) => {
    const token = req.cookies.accessToken;

    console.log(`Token from cookies: ${token}`);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        try {
            const { title, desc, img, video } = req.body;

            if (!desc && !img && !video) {
                return res.status(400).json(
                    'At least one of description, image, or video is required'
                );
            }

            await Posts.create({
                post_title: title || null,
                post_description: desc || null, 
                image: img || null, 
                video: video || null, 
                user_id: userInfo.id,
                created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            });

            return res.status(200).json('Post has been created');
        }
        catch (err) {
            serverErrorHandler(addPost.name, err, res);
        }
    });
}

export const deletePost = async (req, res) => {
    const token = req.cookies.accessToken;

    console.log(`Token from cookies: ${token}`);

    if (!token) {
        return res.status(401).json('User not logged in');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        try {
            const post_id = req.params.post_id;

            const post = await Posts.findOne({ 
                where: { id: post_id } 
            });

            if (!post) {
                return res.status(404).json('Post not found');
            }

            if (post.user_id !== userInfo.id) {
                return res.status(403).json('You can delete only your post');
            }

            await Posts.destroy({
                where: { id: post_id },
            });

            return res.status(200).json('Post has been deleted');
        }
        catch (err) {
            serverErrorHandler(deletePost.name, err, res);
        }
    });
}
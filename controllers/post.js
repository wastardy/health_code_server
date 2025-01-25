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

                return res.status(200).json(posts);
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
    
            return res.status(200).json(posts);
        }
        catch (err) {
            serverErrorHandler(getPosts.name, err, res);
        }
    });
}

export const addPost = async (req, res) => {

}

export const deletePost = async (req, res) => {

}
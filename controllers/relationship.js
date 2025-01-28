import { userInfo } from 'os';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import Relationships from '../models/Relationships.js';
import moment from 'moment';

export const getRelationships = async (req, res) => {
    try {
        const userId = req.query.user_id;

        if (!userId) {
            return res.status(400).json('user_id is required');
        }

        // get all followers for user
        const relationships = await Relationships.findAll({
            where: {
                follower_id: userId,
            }
        });

        const followers = relationships.map(rel => rel.following_id);

        return res.status(200).json({
            followers_count: followers.length, 
            followers: followers,
        });
    }
    catch (err) {
        serverErrorHandler(getRelationships.name, err, res);
    }
}

export const addRelationship = async (req, res) => {
    try {
        const { user_id } = req.body;
        const followerId = req.user?.id;
        console.log(`\nfollower id: ${followerId}`);

        if (!user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        await Relationships.create({
            follower_id: followerId,
            following_id: user_id, 
            created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        });

        return res.status(200).json('Relationship added successfully');
    }
    catch (err) {
        serverErrorHandler(addRelationship.name, err, res);
    }
}

export const deleteRelationship = async (req, res) => {
    try {
        const { user_id } = req.body;
        const followerId = req.user?.id;
        console.log(`\nfollower id: ${followerId}`);

        if (!user_id) {
            return res.status(400).json('user_id is required');
        }

        const result = await Relationships.destroy({
            where: {
                follower_id: followerId,
                following_id: user_id,
            },
        });

        if (result === 0) {
            return res.status(404).json('Relationship not found');
        }

        return res.status(200).json('Relationship deleted successfully');
    }
    catch (err) {
        serverErrorHandler(deleteRelationship.name, err, res);
    }
}
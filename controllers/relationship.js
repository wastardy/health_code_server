import serverErrorHandler from '../middleware/serverErrorHandler.js';
import Relationships from '../models/Relationships.js';

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

}

export const deleteRelationship = async (req, res) => {

}
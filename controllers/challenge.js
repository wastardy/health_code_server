import { Op } from 'sequelize';
import Challenges from '../models/Challenges.js';
import Relationships from '../models/Relationships.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';

export const getChallenges = async (req, res) => {
    const userId = req.user.id;

    try {
        // get list of friends
        const friends = await Relationships.findAll({
            where: {
                [Op.or]: [
                    { follower_id: userId },
                    { following_id: userId },
                ]   
            }
        });

        const friendsIds = friends.map(friend => 
            friend.follower_id === userId 
            ? friend.following_id
            : friend.follower_id
        ) || [];

        const allUserIds = [userId, ...friendsIds];

        // fetch challenges (both user-related and general)
        const challenges = await Challenges.findAll({
            where: {
                [Op.or]: [
                    { user_id: { [Op.in]: allUserIds } },   // user-related challenges
                    { user_id: null }                       // general challenges
                ]
            },
            order: [['created_at', 'DESC']],
        });

        if (!challenges || challenges.length === 0) {
            return res.status(404).json('No challenges found');
        }

        return res.status(200).json({
            count_challenges: challenges.length,
            challenges: challenges,
        });
    }
    catch (err) {
        serverErrorHandler(getChallenges.name, err, res);
    }
}

export const addChallenge = async (req, res) => {

}

export const deleteChallenge = async (req, res) => {

}
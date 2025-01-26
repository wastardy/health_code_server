import { Op } from 'sequelize';
import Challenges from '../models/Challenges.js';
import Relationships from '../models/Relationships.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';
import moment from 'moment';

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
    const userId = req.user.id;
    const { type, title, description, start_date, end_date } = req.body;

    try {
        if (!type || !title || !description) {
            return res.status(400).json(
                'Type, title, and description are required.'
            );
        }

        // chech type
        const validTypes = [
            'outdoor_activity', 
            'indoor_activity', 
            'sleep', 
            'water', 
            'nutrition'
        ];

        if (!validTypes.includes(type)) {
            return res.status(400).json('Invalid type provided.');
        }

        // check date
        const currentDate = new Date();
        if (start_date && end_date && new Date(end_date) < new Date(start_date)) {
            res.status(400).json('End date cannot be earlier than start date.');
        }

        const status = start_date && new Date(start_date) > currentDate
            ? 'unavailable'
            : 'active';

        const newChallenge = await Challenges.create({
            type,
            title, 
            description, 
            start_date: start_date || null, 
            end_date: end_date || null,
            status,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            user_id: userId,
        });

        return res.status(200).json({
            message: 'Challenge added successfully!',
            challenge: newChallenge,
        });
    }
    catch (err) {
        serverErrorHandler(addChallenge.name, err, res);
    }
}

export const deleteChallenge = async (req, res) => {

}
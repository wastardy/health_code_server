import Workouts from '../models/Workouts.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';

export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workouts.findAll();

        if (workouts.length > 0) {
            return res.status(200).json({
                workouts_count: workouts.length, 
                workouts: workouts,
            });
        }
        else {
            return res.status(404).json('Workouts not found');
        }
    }
    catch (err) {
        serverErrorHandler(getWorkouts.name, err, res);
    }
}

export const addWorkout = async (req, res) => {

}

export const deleteWorkout = async (req, res) => {

}
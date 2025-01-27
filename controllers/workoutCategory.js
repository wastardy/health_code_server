import WorkoutCategories from '../models/WorkoutCategories.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';

export const getWorkoutCategories = async (req, res) => {
    try {
        const workoutCategories = await WorkoutCategories.findAll({
            // limit: 20,
            // order: [['title', 'ASC']],
        });

        if (workoutCategories.length > 0) {
            return res.status(200).json({
                workout_categories_count: workoutCategories.length, 
                workout_categories: workoutCategories,
            });
        }
        else {
            return res.status(404).json('Workout categories not found');
        }
    }
    catch (err) {
        serverErrorHandler(getWorkoutCategories.name, err, res);
    }
}

export const addWorkoutCategory = async (req, res) => {

}

export const deleteWorkoutCategory = async (req, res) => {

}
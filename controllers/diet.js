import Diets from '../models/Diets.js';
import serverErrorHandler from '../middleware/serverErrorHandler.js';

export const getDiets = async (req, res) => {
    try {
        const diets = await Diets.findAll({
            order: [['name', 'ASC']],
        });

        if (diets.length > 0) {
            return res.status(200).json({
                diets_count: diets.length, 
                diets: diets,
            });
        }
        else {
            return res.status(404).json('Diets not found');
        }
    }
    catch (err) {
        serverErrorHandler(getDiets.name, err, res);
    }
}

export const addDiet = async (req, res) => {

}

export const deleteDiet = async (req, res) => {

}
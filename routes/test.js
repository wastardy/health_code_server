import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'HealthCode API is up to use!',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

export default router;
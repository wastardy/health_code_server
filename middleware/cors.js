const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // acces to every client

    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization'    
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 
            'GET, PUT, POST, PATCH, DELETE'
        );

        return res.status(200).json({});
    }

    next();
}

export default corsMiddleware;
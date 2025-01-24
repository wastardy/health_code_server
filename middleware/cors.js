const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin); // acces to every client

    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization'    
    );

    res.header(
        'Access-Control-Allow-Methods', 
        'GET, PUT, POST, PATCH, DELETE'
    );

    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    next();
}

export default corsMiddleware;
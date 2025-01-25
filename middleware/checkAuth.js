import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    console.log(`\nToken from cookies: ${token}\n`);
    
    if (!token) {
        return res.status(401).json('User not logged in');
    }
    
    jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).json('Token is not valid');
        }

        req.user = userInfo;
        next();
    });
}

export default verifyToken;
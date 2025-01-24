const serverErrorHandler = (functionName, error, res) => {
    console.error(`Error during ${functionName}: ${error.message}`);
    return res.status(500).json({ message: 'Server error' });
}

export default serverErrorHandler;
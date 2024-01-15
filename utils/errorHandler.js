function errorHandler(err, req, res, next) {
    console.error(err.stack); // log the error to the console

    // check if the error has a custom message
    const errorMessage = err.message || "Something went wrong!";

    // send an error response to the client with the custom message
    res.status(500).json({ message: errorMessage });
}
module.exports = errorHandler;

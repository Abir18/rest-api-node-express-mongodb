// Error Handling Middleware
function errorMiddleware(err, req, res, next) {
  console.log("This is an error on server side");

  const statusCode = res.statusCode ? res.statusCode : 503;

  console.log(statusCode);

  res.status(statusCode).json({
    message: err.message,
    status: res.statusCode,
    stack: process.env.NODE_ENV == "development" ? err.stack : null
  });

  // next();
}

module.exports = errorMiddleware;

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
  };
  
  module.exports = errorHandler;
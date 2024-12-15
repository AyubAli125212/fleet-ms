const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  handler: (req, res, next, options) => {
    if (req.rateLimit.used === req.rateLimit.limit + 1) {
      console.log("Too many requests, please try again later.");
    }
    res.status(options.statusCode).send(options.message);
  },
});

module.exports = rateLimiter;

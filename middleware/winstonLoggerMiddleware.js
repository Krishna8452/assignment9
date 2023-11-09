const logger = require("../helper/logger");

const WinstonLoggerMiddleware = (req, res, next) => {
  const options = { timeZone: "Asia/Kathmandu" };
  const timestamp = new Date().toLocaleString("en-US", options);

  logger.info(
    `Request Initiated | ${req.method} | ${
      req.originalUrl
    }| Req.body: ${JSON.stringify(req.body)} |Params: ${JSON.stringify(
      req.params
    )}| Date: ${timestamp}}`
  );
  next();
};

module.exports = WinstonLoggerMiddleware;

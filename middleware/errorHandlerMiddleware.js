const sendResponse = require('../helper/apiResponse');
const HttpStatus = require('http-status');
const logger = require('../helper/logger');

const errorHandlerMiddleware = (error, req, res, next) => {
    /**
        * Sends an API erro response with the given data and HTTP status code.
        * @param {Object} res - The response object to send the data back to the client.
        * @param {Number} statusCode - The HTTP status code to send in the response.
        * @param {Boolean} success - Whether the API call was successful or not.
        * @param {Object} data - The data to send in the response.
        * @param {String} message - An optional message to send in the response.
        * @param {Object} error - An optional error object to send in the response.
 */
    logger.error(`Request Terminated : ${req.method} ${req.originalUrl} | Request Body : ${JSON.stringify(req.body)} | Query Params:  ${JSON.stringify(req.query)} | Error Code: ${error.status || HttpStatus.INTERNAL_SERVER_ERROR} | Error Message: ${error.message} |`);
    next()
    return sendResponse(res, error.status || HttpStatus.INTERNAL_SERVER_ERROR, false, null, "Some Error Occured", error.message);
};

module.exports = errorHandlerMiddleware;
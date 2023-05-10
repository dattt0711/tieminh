const moment = require('moment-timezone');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const responseError = (message, errors = {}) => {
    const response = {};
    response.success = false;
    response.message = message;
    response.errors = errors;
    return response;
}

const responseSuccess = (message, result = {}) => {
    const response = {
        success: true,
        message: message,
    };
    if (result) {
        response.data = result;
    }
    return response;
};
const generatorTime = () => moment().format('YYYY-MM-DD HH:mm:ss');

const convertToObjectId = (value) => ObjectId(value);
const escapeRegExp = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regExpSearch = (string = '') => {
    const regex = new RegExp(escapeRegExp(string), 'i');
    return regex;
};
module.exports = {
    responseError,
    responseSuccess,
    generatorTime,
    convertToObjectId,
    regExpSearch,
}
const _ = require("lodash");


Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
        throw reason;
    }));
};

const sleep = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};

const isArray = function (obj) {
    return _.isArray(obj);
};

const isObject = function (obj) {
    return _.isObject(obj);
};

const isString = function (obj) {
    return _.isString(obj);
};

const isError = function (obj) {
    return _.isError(obj);
};

const isUndefined = function (obj) {
    return _.isUndefined(obj);
};

const isNull = function (obj) {
    return _.isNull(obj);
};

const isNaN = function (obj) {
    return _.isNaN(obj);
};

const endsWith = function (source, target) {
    return _.endsWith(source, target);
};

const startsWith = function (source, target) {
    return _.startsWith(source, target);
};

const cloneDeep = function (obj) {
    return _.cloneDeep(obj);
};

const includes = function (collection, value) {
    return _.includes(collection, value);
};

const toString = function (value) {
    return _.toString(value);
};

const capitalize = function (value) {
    return _.capitalize(value);
};

const keys = function (obj) {
    return _.keys(obj);
};

const countBy = function (collection, iterater) {
    return _.countBy(collection, iterater);
};

const pickBy = function (obj, predicate) {
    return _.pickBy(obj, predicate);
};

const forEach = function (collection, iterater) {
    return _.forEach(collection, iterater);
};

const omit = function (obj, path) {
    return _.omit(obj, path);
};


module.exports = {
    sleep,
    isArray,
    isObject,
    isUndefined,
    isNull,
    isNaN,
    isString,
    isError,
    endsWith,
    startsWith,
    cloneDeep,
    includes,
    toString,
    capitalize,
    keys,
    countBy,
    pickBy,
    forEach,
    omit,
};
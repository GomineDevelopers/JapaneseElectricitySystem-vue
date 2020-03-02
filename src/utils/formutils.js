import _ from 'lodash'

var isBuffer = _.isBuffer

/* global toString:true */

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]'
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData)
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
    var result
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val)
    } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer)
    }
    return result
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && typeof val === 'object'
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
    return toString.call(val) === '[object File]'
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
    return toString.call(val) === '[object Blob]'
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
    return toString.call(val) === '[object Function]'
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
    return isObject(val) && isFunction(val.pipe)
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */
function params(obj) {
    let params = []
    let escape = encodeURIComponent
    params.add = function (key, value) {
        if (_.isFunction(value)) {
            value = value()
        }
        if (value === null) {
            value = ''
        }
        this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj)
    return params.join('&').replace(/%20/g, '+')
}

function serialize(params, obj, scope) {
    let array = _.isArray(obj)
    let plain = _.isPlainObject(obj)
    let hash = null
    _.forEach(obj, (value, key) => {
        hash = _.isObject(value) || _.isArray(value)
        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']'
        }
        if (!scope && array) {
            params.add(value.name, value.value)
        } else if (hash) {
            serialize(params, value, key)
        } else {
            params.add(key, value)
        }
    })
}

export default {
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isObject: isObject,
    isFile: isFile,
    isBlob: isBlob,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    params: params
}
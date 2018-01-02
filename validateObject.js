/**
 * Validate an object's parameter names to ensure they
 * match a list of expected variables name for this option
 * type. Used to ensure option object passed into the API don't
 * contain erroneous parameters.
 * @param {Object} obj - User options object
 * @param {Object} keys - valid keys and types that may exist in obj.
 * @throws {Error} Invalid option parameter found.
 * @private
 */

// 从mqtt中提取出的验证对象的属性类型的函数
var validate = function (obj, keys) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (keys.hasOwnProperty(key)) {
        if (typeof obj[key] !== keys[key])
          throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
      } else {
        var errorStr = "Unknown property, " + key + ". Valid properties are:";
        for (var key in keys)
          if (keys.hasOwnProperty(key))
            errorStr = errorStr + " " + key;
        throw new Error(errorStr);
      }
    }
  }
};

// Example:
// validate(connectOptions, {
//   timeout: "number",
//   userName: "string",
//   password: "string",
//   willMessage: "object",
//   keepAliveInterval: "number",
//   cleanSession: "boolean",
//   useSSL: "boolean",
//   invocationContext: "object",
//   onSuccess: "function",
//   onFailure: "function",
//   hosts: "object",
//   ports: "object",
//   mqttVersion: "number"
// });

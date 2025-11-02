exports.success = (data = {}, statusCode = 200) => ({ success: true, data, statusCode });
exports.error = (message = 'Error', statusCode = 500, details) => ({ success: false, message, statusCode, details });

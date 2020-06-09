function getApiError(error, entity = 'Entity') {
    if (error.name) {
      switch(error.name) {
        case 'MongoError':
          if (error.message.includes('duplicate')) {
            return {
              status: 400,
              message: `${entity} already exist`,
              code: 1
            }
          }
          return {
            status: 400,
            message: error.message,
            code: 10 // Means unexpected mongo validation Error
          };
        case 'ValidationError':
          return {
            status: 400,
            message: error.message.split(':')[0],
            fields: error.errors,
            code: 2,
          };
        case 'CustomError':
          return {
            status: 400,
            message: error.message,
            code: 3,
          };
        case 'NotFound':
          return {
            status: 404,
            message: error.message,
          };
        case 'Forbidden':
          return {
            status: 403,
            message: error.message,
          };
        default: 
          return {
            status: 400,
            message: error.message,
            code: 0
          }
      }
    } else {
      return {
        status: 500,
        message: error.message,
      }
    }
  }

module.exports = {
    getApiError,
}
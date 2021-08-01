class CustomError extends Error {
  constructor(type = 'GENERIC', status = 400, ...params) {
      super(...params)

      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CustomError)
      }

      this.type = type
      this.status = status
  }
} 

export { CustomError };
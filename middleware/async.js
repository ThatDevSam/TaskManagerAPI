//Generic wrapper function to provide a try/catch to all async middleware.
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            //If function returns an error, pass it to the ErrorHandler middleware.
            next(error)
        }
    }
}
module.exports = asyncWrapper
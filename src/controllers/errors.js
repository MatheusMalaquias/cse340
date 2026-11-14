// Creates a 404 error that the global error handler turns into the 404 page
const createNotFoundError = () => {
  const err = new Error("Page Not Found")
  err.status = 404
  return err
}

// Route ids must be positive whole numbers
const isValidId = (id) => {
  const number = Number(id)
  return Number.isInteger(number) && number > 0
}

// Forces a 500 error so the error page can be tested
const testErrorPage = (req, res, next) => {
  const err = new Error("This is a test error")
  err.status = 500
  next(err)
}

export { createNotFoundError, isValidId, testErrorPage }

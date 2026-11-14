import "dotenv/config"
import express from "express"
import { testConnection } from "./src/models/db.js"
import router from "./src/routes.js"

const app = express()
const port = process.env.PORT || 3000
const nodeEnv = process.env.NODE_ENV || "production"

// Serve static files
app.use(express.static("public"))

// Set EJS as the view engine
app.set("view engine", "ejs")
app.set("views", "./src/views")

// Middleware to log all incoming requests
app.use((req, res, next) => {
  if (nodeEnv === "development") {
    console.log(`${req.method} ${req.url}`)
  }
  next()
})

// Make NODE_ENV available to all templates
app.use((req, res, next) => {
  res.locals.NODE_ENV = nodeEnv
  next()
})

// Routes
app.use(router)

// Catch-all route for 404 errors
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message)
  console.error("Stack trace:", err.stack)

  const status = err.status || 500
  const template = status === 404 ? "404" : "500"

  const context = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: err.message,
    stack: err.stack
  }

  res.status(status).render(`errors/${template}`, context)
})

// Start server
app.listen(port, async (error) => {
  if (error) {
    console.error("Error starting the server:", error)
    return
  }

  try {
    await testConnection()
    console.log(`Server is running at http://127.0.0.1:${port}`)
    console.log(`Environment: ${nodeEnv}`)
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
})

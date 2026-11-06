import "dotenv/config"
import express from "express"
import { testConnection } from "./src/models/db.js"
import { getAllOrganizations } from "./src/models/organizations.js"
import { getAllProjects } from "./src/models/projects.js"
import { getAllCategories } from "./src/models/categories.js"

const app = express()
const port = process.env.PORT || 3000
const nodeEnv = process.env.NODE_ENV || "production"

// Set EJS as the view engine
app.set("view engine", "ejs")
app.set("views", "./src/views")

// Serve static files
app.use(express.static("public"))

// Home route
app.get("/", async (req, res) => {
  res.render("home", { title: "Home" })
})

// Organizations route
app.get("/organizations", async (req, res) => {
  const organizations = await getAllOrganizations()

  res.render("organizations", { title: "Organizations", organizations })
})

// Service projects route
app.get("/projects", async (req, res) => {
  const projects = await getAllProjects()

  res.render("projects", { title: "Service Projects", projects })
})

// Categories route
app.get("/categories", async (req, res) => {
  const categories = await getAllCategories()

  res.render("categories", { title: "Service Project Categories", categories })
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

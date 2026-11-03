import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Set EJS as the view engine
app.set("view engine", "ejs")
app.set("views", "./views")

// Serve static files
app.use(express.static("public"))

// Home route
app.get("/", async (req, res) => {
  res.render("home", { title: "Home" })
})

// Organizations route
app.get("/organizations", async (req, res) => {
  const organizations = [
    {
      name: "AI & Automation",
      category: "Artificial Intelligence",
      description: "Explore artificial intelligence, workflow automation, n8n, and AI agents. Share ideas and build solutions together.",
      image: "/images/ai-automation.jpg",
      link: "/projects"
    },
    {
      name: "Developers Hub",
      category: "Programming",
      description: "Connect with developers, practice coding, collaborate on software projects, and learn new technologies.",
      image: "/images/developers.jpg",
      link: "/projects"
    },
    {
      name: "English Together",
      category: "Language Learning",
      description: "Practice English, improve your communication skills, and prepare for international opportunities.",
      image: "/images/english.jpg",
      link: "/projects"
    },
    {
      name: "Global Careers",
      category: "Professional Development",
      description: "Share international career opportunities, exchange experiences, and prepare for remote work.",
      image: "/images/global-careers.jpg",
      link: "/projects"
    }
  ]

  res.render("organizations", {
    title: "Organizations",
    organizations
  })
})

// Service projects route
app.get("/projects", async (req, res) => {
  const projects = [
    {
      name: "Website Sprint for Local Nonprofits",
      organization: "Developers Hub",
      category: "Community Service",
      description: "Volunteers build simple websites for small nonprofits that need an online presence."
    },
    {
      name: "AI Basics Workshop",
      organization: "AI & Automation",
      category: "Educational",
      description: "A free introduction to AI tools for people who want to use them in everyday work."
    },
    {
      name: "English Conversation Circles",
      organization: "English Together",
      category: "Educational",
      description: "Weekly practice groups where volunteers help learners speak English with confidence."
    },
    {
      name: "Resume Review Day",
      organization: "Global Careers",
      category: "Community Service",
      description: "Experienced professionals review resumes and offer advice to job seekers."
    }
  ]

  res.render("projects", { title: "Service Projects", projects })
})

// Categories route
app.get("/categories", async (req, res) => {
  const categories = [
    { name: "Environmental", description: "Projects that protect nature and care for the places we share." },
    { name: "Educational", description: "Projects that help people learn, teach, and build new skills." },
    { name: "Community Service", description: "Projects that meet local needs and support our neighbors." },
    { name: "Health and Wellness", description: "Projects that promote physical and mental well-being." }
  ]

  res.render("categories", { title: "Service Project Categories", categories })
})

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
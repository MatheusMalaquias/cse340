import { getUpcomingProjects, getProjectDetails } from "../models/projects.js"
import { getCategoriesByProjectId } from "../models/categories.js"
import { createNotFoundError, isValidId } from "./errors.js"

const NUMBER_OF_UPCOMING_PROJECTS = 5

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS)
  const title = "Upcoming Service Projects"

  res.render("projects", { title, projects })
}

const showProjectDetailsPage = async (req, res, next) => {
  const projectId = req.params.id

  if (!isValidId(projectId)) {
    return next(createNotFoundError())
  }

  const projectDetails = await getProjectDetails(projectId)

  if (!projectDetails) {
    return next(createNotFoundError())
  }

  const categories = await getCategoriesByProjectId(projectId)
  const title = projectDetails.title

  res.render("project", { title, projectDetails, categories })
}

export { showProjectsPage, showProjectDetailsPage }

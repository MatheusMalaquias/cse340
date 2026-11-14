import { getAllOrganizations, getOrganizationDetails } from "../models/organizations.js"
import { getProjectsByOrganizationId } from "../models/projects.js"
import { createNotFoundError, isValidId } from "./errors.js"

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations()
  const title = "Our Partner Organizations"

  res.render("organizations", { title, organizations })
}

const showOrganizationDetailsPage = async (req, res, next) => {
  const organizationId = req.params.id

  if (!isValidId(organizationId)) {
    return next(createNotFoundError())
  }

  const organizationDetails = await getOrganizationDetails(organizationId)

  if (!organizationDetails) {
    return next(createNotFoundError())
  }

  const projects = await getProjectsByOrganizationId(organizationId)
  const title = organizationDetails.name

  res.render("organization", { title, organizationDetails, projects })
}

export { showOrganizationsPage, showOrganizationDetailsPage }

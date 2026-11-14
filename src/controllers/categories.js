import { getAllCategories, getCategoryDetails } from "../models/categories.js"
import { getProjectsByCategoryId } from "../models/projects.js"
import { createNotFoundError, isValidId } from "./errors.js"

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories()
  const title = "Service Project Categories"

  res.render("categories", { title, categories })
}

const showCategoryDetailsPage = async (req, res, next) => {
  const categoryId = req.params.id

  if (!isValidId(categoryId)) {
    return next(createNotFoundError())
  }

  const categoryDetails = await getCategoryDetails(categoryId)

  if (!categoryDetails) {
    return next(createNotFoundError())
  }

  const projects = await getProjectsByCategoryId(categoryId)
  const title = categoryDetails.name

  res.render("category", { title, categoryDetails, projects })
}

export { showCategoriesPage, showCategoryDetailsPage }

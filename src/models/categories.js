import db from "./db.js"

const getAllCategories = async () => {
  const result = await db.query(`
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `)

  return result.rows
}

// Returns one category, or null if the id does not exist
const getCategoryDetails = async (categoryId) => {
  const result = await db.query(
    `
      SELECT category_id, name
      FROM public.category
      WHERE category_id = $1;
    `,
    [categoryId]
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

// Goes through the project_category junction table
const getCategoriesByProjectId = async (projectId) => {
  const result = await db.query(
    `
      SELECT c.category_id, c.name
      FROM public.category AS c
      JOIN public.project_category AS pc
        ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.name;
    `,
    [projectId]
  )

  return result.rows
}

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId }

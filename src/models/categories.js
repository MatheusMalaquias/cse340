import db from "./db.js"

const getAllCategories = async () => {
  const result = await db.query(`
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `)

  return result.rows
}

export { getAllCategories }

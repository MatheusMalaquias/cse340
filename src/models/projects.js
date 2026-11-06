import db from "./db.js"

// The JOIN adds each project's organization name
const getAllProjects = async () => {
  const result = await db.query(`
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.project_date,
      o.name AS organization_name
    FROM public.project AS p
    JOIN public.organization AS o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `)

  return result.rows
}

export { getAllProjects }

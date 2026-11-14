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
      o.organization_id,
      o.name AS organization_name
    FROM public.project AS p
    JOIN public.organization AS o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `)

  return result.rows
}

// Returns the next projects from today on, limited to numberOfProjects
const getUpcomingProjects = async (numberOfProjects) => {
  const result = await db.query(
    `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.project_date,
        o.organization_id,
        o.name AS organization_name
      FROM public.project AS p
      JOIN public.organization AS o
        ON p.organization_id = o.organization_id
      WHERE p.project_date >= CURRENT_DATE
      ORDER BY p.project_date
      LIMIT $1;
    `,
    [numberOfProjects]
  )

  return result.rows
}

// Returns one project with its organization, or null if the id does not exist
const getProjectDetails = async (projectId) => {
  const result = await db.query(
    `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.project_date,
        o.organization_id,
        o.name AS organization_name
      FROM public.project AS p
      JOIN public.organization AS o
        ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `,
    [projectId]
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

const getProjectsByOrganizationId = async (organizationId) => {
  const result = await db.query(
    `
      SELECT project_id, organization_id, title, description, location, project_date
      FROM public.project
      WHERE organization_id = $1
      ORDER BY project_date;
    `,
    [organizationId]
  )

  return result.rows
}

// Goes through the project_category junction table
const getProjectsByCategoryId = async (categoryId) => {
  const result = await db.query(
    `
      SELECT
        p.project_id,
        p.title,
        p.project_date,
        o.organization_id,
        o.name AS organization_name
      FROM public.project AS p
      JOIN public.project_category AS pc
        ON p.project_id = pc.project_id
      JOIN public.organization AS o
        ON p.organization_id = o.organization_id
      WHERE pc.category_id = $1
      ORDER BY p.project_date;
    `,
    [categoryId]
  )

  return result.rows
}

export {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  getProjectsByCategoryId
}

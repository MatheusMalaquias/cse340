import db from "./db.js"

const getAllOrganizations = async () => {
  const result = await db.query(`
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization
    ORDER BY name;
  `)

  return result.rows
}

// Returns one organization, or null if the id does not exist
const getOrganizationDetails = async (organizationId) => {
  const result = await db.query(
    `
      SELECT organization_id, name, description, contact_email, logo_filename
      FROM public.organization
      WHERE organization_id = $1;
    `,
    [organizationId]
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

export { getAllOrganizations, getOrganizationDetails }

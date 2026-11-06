import { Pool } from "pg"

// The pool keeps database connections open so queries can reuse them
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
})

// Runs a query and logs its text, duration, and number of rows
const loggedQuery = async (text, params) => {
  const start = Date.now()
  const result = await pool.query(text, params)
  const duration = Date.now() - start

  console.log("Executed query:", {
    text: text.replace(/\s+/g, " ").trim(),
    duration: `${duration}ms`,
    rows: result.rowCount
  })

  return result
}

// Logging is only used while developing, and only when it is turned on
const isSqlLoggingEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.ENABLE_SQL_LOGGING === "true"

const db = isSqlLoggingEnabled
  ? {
      query: loggedQuery,
      close: async () => {
        await pool.end()
      }
    }
  : pool

// Confirms that the application can reach the database
const testConnection = async () => {
  const result = await db.query("SELECT NOW() AS current_time")
  console.log("Database connection successful:", result.rows[0].current_time)
}

export default db
export { testConnection }

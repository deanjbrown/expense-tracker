import { sql, Table } from "drizzle-orm";
import { db, DB } from ".";
import * as schema from "../db/schema";
import * as seeds from "../db/seeds";

// Empties a given table in the database
async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
  for (const table of [schema.user, schema.expense]) {
    await resetTable(db, table);
  }

  // Seeds each table with dummy data
  await seeds.user(db);
  await seeds.expense(db);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding completed");
    process.exit();
  });

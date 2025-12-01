import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("borrows", (table) => {
    table.date("returned_at").nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("borrows", (table) => {
    table.dropColumn("returned_at")
  })
}

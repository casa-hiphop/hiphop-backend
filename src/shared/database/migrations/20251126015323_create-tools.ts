import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tools", (table) => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary()
    table.string("name").notNullable().unique()
    table.string("description").notNullable()
    table.integer("quantity").notNullable().defaultTo(0)
    table.string("brand").notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tools")
}
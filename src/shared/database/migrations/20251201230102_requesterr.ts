import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("requesters", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
    table.string("name").notNullable()
    table.string("email").notNullable()
    table.string("phone").notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("requesters")
}

import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("borrows", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
    table.uuid("tool_id").notNullable()
    table.uuid("unit_id").notNullable()
    table.uuid("requester_id").notNullable()
    table.date("date").notNullable()
    table.date("return_date").notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("borrows")
}

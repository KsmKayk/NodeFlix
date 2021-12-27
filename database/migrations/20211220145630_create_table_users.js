
exports.up = knex =>
  knex.schema.createTableIfNotExists('users', table => {
      table.increments("id")
      table.text("email").unique().notNullable()
      table.text("passwordHash").notNullable()
      table.boolean("isAdministrator").defaultTo(false).notNullable()
      table.boolean("isPremium").defaultTo(false).notNullable()
      table.timestamp("lastPaymentAt").defaultTo(null).nullable()
      table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable()
      table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable()
  })


exports.down = knex => knex.schema.dropTableIfExists("users")


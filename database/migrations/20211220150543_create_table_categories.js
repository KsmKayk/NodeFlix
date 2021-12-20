
exports.up = knex =>
    knex.schema.createTableIfNotExists('categories', table => {
        table.increments("id")
        table.text("name").unique().notNullable()
    })


exports.down = knex => knex.schema.dropTableIfExists("categories")


exports.up = knex =>
    knex.schema.createTableIfNotExists('categories', table => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.text("thumbnailUrl").notNullable()
        table.integer("categoryId").unsigned().index().references("id").inTable("categories").onDelete("SET NULL")
    })


exports.down = knex => knex.schema.dropTableIfExists("categories")
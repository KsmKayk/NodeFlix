
exports.up = knex =>
    knex.schema.createTableIfNotExists('animes', table => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.text("thumbnailUrl").notNullable()
        table.integer("categoryId").unsigned().index().references("id").inTable("categories").onDelete("SET NULL").nullable()
    })


exports.down = knex => knex.schema.dropTableIfExists("animes")
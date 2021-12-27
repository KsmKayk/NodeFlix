
exports.up = knex =>
    knex.schema.createTableIfNotExists('episodes', table => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.text("thumbnailUrl").notNullable()
        table.integer("animeId").unsigned().index().references("id").inTable("animes").onDelete("CASCADE").notNullable()
    })


exports.down = knex => knex.schema.dropTableIfExists("episodes")
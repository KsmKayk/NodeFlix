module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: "./database/database.sqlite"
        },
        migrations: {
            tableName: "knexMigrations",
            directory: `${__dirname}/database/migrations`
        }
    }
};
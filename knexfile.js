require('dotenv').config()
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 5432,
            user : user,
            password : password,
            database : 'nodeflix'
        },
        migrations: {
            tableName: "knexMigrations",
            directory: `${__dirname}/database/migrations`
        }
    }
};
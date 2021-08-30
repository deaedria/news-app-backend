const connectionString = "postgres://yatrkeovrrztfy:84fce4f88b816f0ad726b4c0c015a483d65062fb45ae1a3ec5fe93493cc39d86@ec2-18-209-153-180.compute-1.amazonaws.com:5432/d83q4s0fe7f82j"
const { Pool } = require("pg");
require("dotenv").config();

const pg = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});
// const pg = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   ssl: true,
//   dialect: 'postgres',
//   dialectOptions: {
//     "ssl": {
//       "rejectUnauthorized": false
//     }
//   }
// });

pg.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Connecction error", err));

module.exports = pg;

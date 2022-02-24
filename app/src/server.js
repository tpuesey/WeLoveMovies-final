const { PORT = 5000} = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migration) => {
    console.log("migrations", migrations);
  })
  .catch(console.error);
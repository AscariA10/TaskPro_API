const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3007, () => {
      console.log(DB_HOST);
      console.log("Database connection successful");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

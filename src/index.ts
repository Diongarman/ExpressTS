import express, { Request, Response } from "express";
import { router } from "./routes/loginRoutes";
var bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
// app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

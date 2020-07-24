import express, { Request, Response } from "express";
var bodyParser = require("body-parser");
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";

import "./controllers/loginController";
import "./controllers/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("listening on port 3000");
});

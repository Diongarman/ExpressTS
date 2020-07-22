import express, { Request, Response } from "express";
import { router } from "./routes/loginRoutes";
var bodyParser = require("body-parser");
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.use(router);
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("listening on port 3000");
});

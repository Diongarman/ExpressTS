import { Request, Response, NextFunction } from "express";
import { get, post, Controller, use, bodyValidator } from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("A request was made YARGH");
  next();
}

//below patches up poor type def file
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@Controller("/auth")
class LoginController {
  @get("/login")
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(
      `<form method="POST">
                <div>
                    <label>Email</label>
                    <input name='email'></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' type='password'></input>
                </div>
        
                <button>Submit</button>
                </form>`
    );
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;

    if (email === "diongarman@gmail.com" && password === "1234") {
      req.session = { isLoggedIn: true };
      res.redirect("/");
    } else {
      res.send("invalid email or password");
    }
  }
}

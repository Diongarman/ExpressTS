import { Request, Response, NextFunction } from "express";
import { get, Controller, use } from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("A request was made YARGH");
  next();
}
console.log("LOGIN CONTROLLA");

@Controller("")
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
}

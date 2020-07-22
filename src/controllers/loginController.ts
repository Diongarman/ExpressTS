import { Request, Response } from "express";
import { get, Controller } from "./decorators";

@Controller("")
class LoginController {
  @get("/login")
  getLogin(path: string, req: Request, res: Response): void {
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

import { Request, Response, NextFunction } from "express";
import { get, post, Controller, use, bodyValidator } from "./decorators";

function requiresAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}

@Controller("")
class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.isLoggedIn) {
      res.send(`
          <div>
              <div>You are logged in</div>
              <a href="/auth/logout">Logout</a>
          </div>
          
          `);
    } else {
      res.send(`
          <div>
              <div>You must sign in</div>
              <a href="/auth/login">Login</a>
          </div>
          
          `);
    }
  }
  @get("/protected")
  @use(requiresAuth)
  getProtected(req: Request, res: Response) {
    res.send("welcome to protected route, logged in user!");
  }
}

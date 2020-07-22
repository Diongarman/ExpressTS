import { Router, Request, Response, NextFunction } from "express";

//below patches up poor type def file
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requiresAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}
const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    res.send(`
    <div>
        <div>You are logged in</div>
        <a href="logout">Logout</a>
    </div>
    
    `);
  } else {
    res.send(`
    <div>
        <div>You must sign in</div>
        <a href="login">Login</a>
    </div>
    
    `);
  }
});
router.get("/login", (req: Request, res: Response) => {
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
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = { isLoggedIn: false };
  res.redirect("/");
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email === "diongarman@gmail.com" && password === "1234") {
    req.session = { isLoggedIn: true };
    res.redirect("/");
  } else {
    res.send("invalid email or password");
  }
});

router.get("/protected", requiresAuth, (req: Request, res: Response) => {
  res.send("welcome to protected route logged in user!");
});

export { router };

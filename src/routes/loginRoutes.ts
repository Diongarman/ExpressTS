import { Router, Request, Response } from "express";

//below patches up poor type def file
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const users = { user1: "password" };

const router = Router();
router.get("/", (req: Request, res: Response) => res.send("hi there"));
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

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email } = req.body;

  if (email) {
    res.send(`Hell ${email.toUpperCase()}`);
  } else {
    res.send("you must provide an email");
  }
});

export { router };

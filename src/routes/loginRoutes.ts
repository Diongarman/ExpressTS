import { Router, Request, Response } from "express";

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

router.post("/login", (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(req.body);
  res.send(`Hell ${email}`);
});

export { router };

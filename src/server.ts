import express, { Request, Response } from "express";
import router from "./routes";
import dotenv from "dotenv";
const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(express.json());
dotenv.config();


app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

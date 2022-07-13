import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./database";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

db.connect().then((client) => {
  return client.query("select now()").then((res) => {
    console.log(res.rows);
  });
});
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

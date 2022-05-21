import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import questionsRouter from "./routes/questionsRouter.js"
import rankingRouter from "./routes/rankingRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(questionsRouter);
app.use(rankingRouter);

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green(`server is running on port: ${process.env.PORT}`))
});
import { Router } from "express";
import questions from "../controllers/questionController.js";

const questionsRouter = Router();
questionsRouter.get("/questions", questions);

export default questionsRouter;
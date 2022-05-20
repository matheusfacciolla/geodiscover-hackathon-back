import { Router } from "express";
import questions from "../controllers/questionController.js";

const questionsRouter = Router();
questionsRouter.get("/questions/:type", questions);

export default questionsRouter;
import { Router } from "express";
import ranking from "../controllers/rankingController.js";
import validateName from "../middlewares/validateNameMiddleware.js";

const rankingRouter = Router();
rankingRouter.post("/ranking", validateName);
rankingRouter.get("/ranking", ranking);

export default rankingRouter;
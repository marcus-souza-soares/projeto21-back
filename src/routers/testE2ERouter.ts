import { Router } from "express";
import { deleteAll } from "../controllers/testeE2EController.js";

const e2eRouter = Router();

e2eRouter.delete("/delete", deleteAll);

export default e2eRouter;

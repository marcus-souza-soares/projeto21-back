import { Request, Response } from "express";
import { recommendationService } from "../services/recommendationsService.js";

export async function deleteAll(req: Request, res: Response){
  await recommendationService.deleteAll();
  return res.sendStatus(200)
}
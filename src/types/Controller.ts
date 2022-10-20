import { NextFunction, Request, Response } from "express";

export type Controller = (
  req: Request,
  res: Response,
  nextFunc: NextFunction
) => void;

import { Request, Response } from 'express';

export const controller = _ => (req: Request, res: Response, _next) => {
  console.log(req.body);
  res.json([{ name: 'ingredient1', id: 1 }, { name: 'ingredient2', id: 2 }]);
};

import { Request, Response } from 'express';

export const controller = _ => (req: Request, res: Response, _next) => {
  console.log(req, res);
  res.json([{ name: 'cake1', id: 1 }, { name: 'cake2', id: 2 }]);
};

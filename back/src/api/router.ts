import { Router } from 'express';

import { controller as mySuggestionC } from './my-suggestion.controller';

const expressRouter = Router();

export const router = (_) => {
  expressRouter.post('/my-suggestions', mySuggestionC({}));
  return expressRouter;
}
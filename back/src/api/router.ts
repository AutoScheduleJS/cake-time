import { Router } from 'express';

import { controller as mySuggestionC } from './my-suggestion.controller';
import { controller as shoppingListC } from './shopping-list.controller';
import { controller as directionsC } from './directions.controller';

const expressRouter = Router();

export const router = (_) => {
  expressRouter.post('/my-suggestions', mySuggestionC({}));
  expressRouter.post('/shopping-list', shoppingListC({}));
  expressRouter.post('/directions', directionsC({}));
  return expressRouter;
}
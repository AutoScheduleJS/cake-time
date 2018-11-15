import { Router } from 'express';

import { controller as mySuggestionC } from './my-suggestion.controller';
import { controller as recipeInfoC } from './recipe-info.controller';
import { controller as shoppingListC } from './shopping-list.controller';
import { controller as directionsC } from './directions.controller';
import { controller as dbTestsC } from './db-tests.controller';

const expressRouter = Router();

export const router = (_) => {
  expressRouter.post('/my-suggestions', mySuggestionC({}));
  expressRouter.post('/recipe-info', recipeInfoC({})); // body: { code: string }
  expressRouter.post('/shopping-list', shoppingListC({}));
  expressRouter.post('/directions', directionsC({}));
  expressRouter.get('/db-tests', dbTestsC({}));
  return expressRouter;
}
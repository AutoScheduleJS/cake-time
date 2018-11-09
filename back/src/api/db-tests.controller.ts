import { v1 as Neo } from 'neo4j-driver';
import { Request, Response } from 'express';

export const controller = _ => (_req: Request, res: Response, _next) => {
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'));
  const session = driver.session();
  session.run(`CREATE (bol:Ustensil {name:"bol"})
  CREATE (beurreBattu:Ingredient {name:"beurre battu"})
  CREATE (farineTamisee:Ingredient {name:"farine tamisée"})
  CREATE (pateBrisee:Recipe)
  `).then(res => {
    console.log('results:');
    console.log(res);
  }, e => {
    console.log(e);
    driver.close();
  });
  res.json([{ name: 'direction1', id: 1 }, { name: 'direction2', id: 2 }]);
};

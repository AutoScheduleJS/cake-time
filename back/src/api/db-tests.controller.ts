import { v1 as Neo } from 'neo4j-driver';
import { Request, Response } from 'express';

export const controller = _ => (_req: Request, res: Response, _next) => {
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'));
  const session = driver.session();
  session
    .run(`CREATE (bol:Ustensil {code:"bol"}),
  (saladier:Ustensil {code:"saladier"}),
  (spatule:Ustensil {code:"spatule"}),
  (beurreBattu:Subrecipe {
    code:"beurre battu",
    preparationTime:5,
    cost:0.015,
    directions:["{code: 'coupezX', x: 'beurreDoux'}", "..."]
  }),
  (lait:Product {code:"lait entier"}),
  (eau:Product {code:"eau"}),
  (beurre:Product {code:"beurreDoux"}),
  (sel:Product {code:"sel fin"}),
  (farineTamisee:Subrecipe {code:"farine tamisée"}),
  (pateBrisee:Recipe {
    code:"pate brisée",
    baseQuantity:"500",
    preparationTime: "15",
    restTime: "120",
    cost: "0.001",
    directions: ["..."]
  }),
  CREATE (beurreBattu)-[:REQUIREMENTS]->(beurre),
  CREATE (beurreBattu)-[:REQUIREMENTS]->(spatule),
  CREATE (beurreBattu)-[:REQUIREMENTS]->(saladier),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(beurreBattu),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(farineTamisee),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(lait),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(sel),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(spatule),
  CREATE (pateBrisee)-[:REQUIREMENTS]->(bol)`)
    .then(res => {
        console.log('results:');
        console.log(res);
        driver.close();
      }, e => {
        console.log(e);
        driver.close();
      });
  res.json([{ name: 'direction1', id: 1 }, { name: 'direction2', id: 2 }]);
};

import { v1 as Neo } from 'neo4j-driver';
import { Request, Response } from 'express';

export const controller = _ => (_req: Request, res: Response, _next) => {
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'));
  const session = driver.session();
  session
    .run(`CREATE (bol:Ustensil {code:"bol"}),
  (saladier:Ustensil {code:"saladier"}),
  (spatule:Ustensil {code:"spatule"}),
  (main:Ustensil {code:"main"}),
  (planTravail:Ustensil {code:"plan de travail"}),
  (beurreBattu:Subrecipe {code:"beurre battu"}),
  (beurreBattuDir1:Direction {code:"beurre battu 1)"}),
  (beurreBattuDir2:Direction {code:"beurre battu 2)"}),
  (beurreBattuDir3:Direction {code:"beurre battu 3)"}),
  (lait:Product {code:"lait entier"}),
  (eau:Product {code:"eau"}),
  (beurre:Product {code:"beurreDoux"}),
  (sel:Product {code:"sel fin"}),
  (laitOuEau:Generic {match:"milk or water"}),
  (farineTamisee:Subrecipe {code:"farine tamisée"}),
  (pateBrisee:Recipe {code:"pate brisée", quantity:"500"}),
  (pateBriseeDir1:Direction {code:"pate brisée 1)"}),
  (pateBriseeDir2:Direction {code:"pate brisée 2)"}),
  (pateBriseeDir3:Direction {code:"pate brisée 3)"}),
  (pateBriseeDir4:Direction {code:"pate brisée 4)"}),
  (pateBriseeDir5:Direction {code:"pate brisée 5)"}),
  (versezXsurY:Instruction {code:"versez x sur y"}),
  (coupezX:Instruction {code:"coupez x"}),
  (mettreXdansY:Instruction {code:"mettre x dans y"}),
  (ecrasezXavecY:Instruction {code:"ecrasez x avec y"}),
  (dissoudreXdansYdansZ:Instruction {code:"dissoudre X dans Y, dans Z"}),
  (tamisezXsurY:Instruction {code:"tamisez x sur y"}),
  (incorporezXdansY:Instruction {code:"incorporezXdansY"})
  CREATE (pateBrisee)-[:DIRECTION]->(pateBriseeDir1)
  CREATE (pateBriseeDir1)-[:INSTRUCTION]->(dissoudreXdansYdansZ)
  CREATE (pateBriseeDir1)-[:REQUIREMENT {arg:'x', factor:0.01}]->(sel)
  CREATE (pateBriseeDir1)-[:REQUIREMENT {arg:'y', factor:0.1}]->(laitOuEau)
  CREATE (pateBriseeDir1)-[:REQUIREMENT {arg:'z'}]->(bol)
  CREATE (laitOuEau)-[:PRODUCT]->(lait)
  CREATE (laitOuEau)-[:PRODUCT]->(eau)
  CREATE (pateBriseeDir1)-[:DIRECTION]->(pateBriseeDir2)
  CREATE (pateBriseeDir2)-[:INSTRUCTION]->(versezXsurY)
  CREATE (pateBriseeDir2)-[:REQUIREMENT {arg:'x', quantity:1}]->(pateBriseeDir1)
  CREATE (pateBriseeDir2)-[:REQUIREMENT {arg:'y', factor:0.38}]->(beurreBattu)
  CREATE (beurreBattu)-[:DIRECTION]->(beurreBattuDir1)
  CREATE (beurreBattuDir1)-[:INSTRUCTION]->(coupezX)
  CREATE (beurreBattuDir1)-[:REQUIREMENT {arg:'x', factor:1}]->(beurre)
  CREATE (beurreBattuDir1)-[:DIRECTION]->(beurreBattuDir2)
  CREATE (beurreBattuDir2)-[:INSTRUCTION]->(mettreXdansY)
  CREATE (beurreBattuDir2)-[:REQUIREMENT {arg:'x', quantity:1}]->(beurreBattuDir1)
  CREATE (beurreBattuDir2)-[:REQUIREMENT {arg:'y'}]->(saladier)
  CREATE (beurreBattuDir2)-[:DIRECTION]->(beurreBattuDir3)
  CREATE (beurreBattuDir3)-[:INSTRUCTION]->(ecrasezXavecY)
  CREATE (beurreBattuDir3)-[:REQUIREMENT {arg:'x', quantity:1}]->(beurreBattuDir2)
  CREATE (beurreBattuDir3)-[:REQUIREMENT {arg:'y'}]->(spatule)
  CREATE (pateBriseeDir2)-[:DIRECTION]->(pateBriseeDir3)
  CREATE (pateBriseeDir3)-[:INSTRUCTION]->(incorporezXdansY)
  CREATE (pateBriseeDir3)-[:REQUIREMENT {arg:'x', factor:0.5}]->(farineTamisee)
  CREATE (pateBriseeDir3)-[:REQUIREMENT {arg:'y', quantity:1}]->(pateBriseeDir2)
  CREATE (pateBriseeDir3)-[:DIRECTION]->(pateBriseeDir4)
  CREATE (pateBriseeDir4)-[:INSTRUCTION]->(mettreXdansY)
  CREATE (pateBriseeDir4)-[:REQUIREMENT {arg:'x', quantity:1}]->(pateBriseeDir3)
  CREATE (pateBriseeDir4)-[:REQUIREMENT {arg:'y'}]->(planTravail)
  CREATE (pateBriseeDir4)-[:DIRECTION]->(pateBriseeDir5)
  CREATE (pateBriseeDir5)-[:INSTRUCTION]->(ecrasezXavecY)
  CREATE (pateBriseeDir5)-[:REQUIREMENT {arg:'x', quantity:1}]->(pateBriseeDir4)
  CREATE (pateBriseeDir5)-[:REQUIREMENT {arg:'y'}]->(main)`)
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
